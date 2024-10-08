import { CartItem } from '~/components/cart/cart-item/cart-item';
import classNames from 'classnames';
import { LockIcon } from '~/components/icons';
import { useEcomAPI } from '~/api/ecom-api-context-provider';
import { useCart, useCartTotals } from '~/api/api-hooks';
import { ROUTES } from '~/router/config';
import { NavLink } from '@remix-run/react';

import styles from './route.module.scss';

export default function CartPage() {
    const ecomAPI = useEcomAPI();
    const cart = useCart();
    const { cartTotals, findLineItemPriceBreakdown } = useCartTotals();

    const handleCheckout = async () => {
        const checkoutResponse = await ecomAPI.checkout();

        if (checkoutResponse.status === 'success') {
            window.location.href = checkoutResponse.body.checkoutUrl;
        } else {
            alert('Checkout failed.');
        }
    };

    const priceSummary = cartTotals.data?.priceSummary;
    return (
        <div className={styles.page}>
            {cart.data && cart.data.lineItems.length > 0 ? (
                <>
                    <div className={styles.cart}>
                        <h1 className={styles.cartHeader}>My cart</h1>
                        <div className={styles.cartItems}>
                            {cart.data.lineItems.map((item) => (
                                <CartItem
                                    key={item._id}
                                    item={item}
                                    priceBreakdown={findLineItemPriceBreakdown(item)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className={styles.summary}>
                        <h1 className={styles.summaryHeader}>Order summary</h1>
                        <div className={styles.summarySection}>
                            <div className={styles.summaryRow}>
                                <span>Subtotal</span>
                                <span>{priceSummary?.subtotal?.formattedConvertedAmount}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span>Delivery</span>
                                <span>{priceSummary?.shipping?.formattedConvertedAmount}</span>
                            </div>
                            <div className={styles.summaryRow}>
                                <span className={styles.location}>Poland</span>
                            </div>
                        </div>

                        <div className={styles.summarySection}>
                            <div className={classNames(styles.summaryRow, styles.summaryTotal)}>
                                <span>Total</span>
                                <span>{priceSummary?.total?.formattedConvertedAmount}</span>
                            </div>
                            <button
                                className={classNames('button', styles.checkoutButton)}
                                onClick={handleCheckout}
                            >
                                Checkout
                            </button>

                            <div className={styles.secureCheckout}>
                                <LockIcon width={11} />
                                <span>Secure Checkout</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className={styles.cart}>
                    <h1 className={styles.cartHeader}>My cart</h1>
                    <div className={styles.emptyCartMessage}>
                        <div>Cart is empty</div>
                        <NavLink to={ROUTES.home.to()} className={styles.continueBrowsingLink}>
                            Continue Browsing
                        </NavLink>
                    </div>
                </div>
            )}
        </div>
    );
}
