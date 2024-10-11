import { CartItem } from '~/components/cart/cart-item/cart-item';
import classNames from 'classnames';
import { LockIcon } from '~/components/icons';
import { ROUTES } from '~/router/config';
import { NavLink } from '@remix-run/react';

import styles from './route.module.scss';
import { useCart } from '~/hooks/use-cart';
import { findLineItemPriceBreakdown } from '~/api/cart-helpers';

export default function CartPage() {
    const { cartData, cartTotals, checkout, removeItem, updateItemQuantity } = useCart();

    if (!cartTotals?.cart) return null;

    if (!cartTotals?.cart.lineItems.length)
        return (
            <div className={styles.cart}>
                <h1 className={styles.cartHeader}>My cart</h1>
                <div className={styles.emptyCartMessage}>
                    <div>Cart is empty</div>
                    <NavLink to={ROUTES.home.to()} className={styles.continueBrowsingLink}>
                        Continue Browsing
                    </NavLink>
                </div>
            </div>
        );

    return (
        <div className={styles.page}>
            <div className={styles.cart}>
                <h1 className={styles.cartHeader}>My cart</h1>
                <div className={styles.cartItems}>
                    {cartData?.lineItems.map((item) => (
                        <CartItem
                            key={item._id}
                            item={item}
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
                <div className={styles.summarySection}>
                    <div className={styles.summaryRow}>
                        <span>Subtotal</span>
                        <span>{cartTotals.priceSummary?.subtotal?.formattedConvertedAmount}</span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span>Delivery</span>
                        <span>
                            {cartTotals.priceSummary?.shipping?.amount === '0.00'
                                ? 'FREE'
                                : cartTotals.priceSummary?.shipping?.formattedConvertedAmount}
                        </span>
                    </div>
                    <div className={styles.summaryRow}>
                        <span className={styles.location}>Poland</span>
                    </div>
                </div>
                <div className={styles.summarySection}>
                    <div className={classNames(styles.summaryRow, styles.summaryTotal)}>
                        <span>Total</span>
                        <span>{cartTotals.priceSummary?.total?.formattedConvertedAmount}</span>
                    </div>

                    <button
                        className={classNames('button', styles.checkoutButton)}
                        onClick={checkout}
                    >
                        Checkout
                    </button>

                    <div className={styles.secureCheckout}>
                        <LockIcon width={11} />
                        <span>Secure Checkout</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
