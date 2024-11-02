import { Link } from '@remix-run/react';
import classNames from 'classnames';
import { useCart, useCheckout } from '~/lib/ecom';
import { findLineItemPriceBreakdown, getErrorMessage } from '~/lib/utils';
import { CartItem } from '~/src/components/cart/cart-item/cart-item';
import { LockIcon } from '~/src/components/icons';
import { Spinner } from '~/src/components/spinner/spinner';

import styles from './route.module.scss';

export default function CartPage() {
    const {
        cart,
        cartTotals,
        isCartUpdating,
        updatingCartItemIds,
        removeItem,
        updateItemQuantity,
    } = useCart();

    const { checkout, isCheckoutInProgress } = useCheckout({
        successUrl: '/thank-you',
        cancelUrl: '/products/all-products',
        onError: (error) => alert(getErrorMessage(error)),
    });

    if (cart.isLoading) {
        return (
            <div className={styles.page}>
                <div className={styles.cart}>
                    <h1 className={styles.cartHeader}>My cart</h1>
                    <div className={styles.cartStatus}>
                        <Spinner size={50} />
                    </div>
                </div>
            </div>
        );
    }

    if (!cart.data) {
        return (
            <div className={styles.page}>
                <div className={styles.cart}>
                    <h1 className={styles.cartHeader}>My cart</h1>
                    <div className={styles.cartStatus}>{getErrorMessage(cart.error)}</div>
                </div>
            </div>
        );
    }

    if (!cart.data?.lineItems.length) {
        return (
            <div className={styles.page}>
                <div className={styles.cart}>
                    <h1 className={styles.cartHeader}>My cart</h1>
                    <div className={styles.cartStatus}>
                        <div className={styles.cartStatusHeader}>Cart is empty</div>
                        <Link to="/products/all-products" className={styles.continueBrowsingLink}>
                            Continue Browsing
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.cart}>
                <h1 className={styles.cartHeader}>My cart</h1>
                <div className={styles.cartItems}>
                    {cart.data.lineItems.map((item) => (
                        <CartItem
                            key={item._id}
                            item={item}
                            isUpdating={updatingCartItemIds.includes(item._id!)}
                            priceBreakdown={findLineItemPriceBreakdown(item, cartTotals)}
                            onRemove={() => removeItem(item._id!)}
                            onQuantityChange={(quantity: number) =>
                                updateItemQuantity({ id: item._id!, quantity })
                            }
                        />
                    ))}
                </div>
            </div>
            <div className={styles.summary}>
                <h1 className={styles.summaryHeader}>Order summary</h1>
                <div
                    className={classNames(styles.summaryContent, {
                        [styles.loading]: isCartUpdating,
                    })}
                >
                    <div className={styles.summaryRow}>
                        <span>Subtotal</span>
                        <span>{cartTotals?.priceSummary?.subtotal?.formattedConvertedAmount}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Delivery</span>
                        <span>
                            {Number(cartTotals?.priceSummary?.shipping?.amount) === 0
                                ? 'FREE'
                                : cartTotals?.priceSummary?.shipping?.formattedConvertedAmount}
                        </span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span className={styles.location}>Poland</span>
                    </div>
                    <div className={classNames(styles.summaryRow, styles.summaryTotal)}>
                        <span>Total</span>
                        <span>{cartTotals?.priceSummary?.total?.formattedConvertedAmount}</span>
                    </div>
                    {isCartUpdating && (
                        <div className={styles.spinner}>
                            <Spinner size={50} />
                        </div>
                    )}
                </div>

                <button
                    className={classNames('button', styles.checkoutButton)}
                    onClick={checkout}
                    disabled={isCheckoutInProgress || isCartUpdating}
                >
                    {isCheckoutInProgress ? <Spinner size="1lh" /> : 'Checkout'}
                </button>

                <div className={styles.secureCheckout}>
                    <LockIcon width={11} />
                    <span>Secure Checkout</span>
                </div>
            </div>
        </div>
    );
}
