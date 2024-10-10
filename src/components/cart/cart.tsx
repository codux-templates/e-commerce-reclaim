import classNames from 'classnames';
import { Drawer } from '~/components/drawer/drawer';
import { CloseIcon, LockIcon } from '~/components/icons';
import { CartItem } from './cart-item/cart-item';
import { useCartOpen } from './cart-open-context';
import { useCart } from '~/api/use-cart';

import styles from './cart.module.scss';

export const Cart = () => {
    const cartOpener = useCartOpen();
    const { cartTotals, cartItems, handleCheckout } = useCart();

    return (
        <Drawer open={cartOpener.isOpen} onClose={() => cartOpener.setIsOpen(false)}>
            <div className={styles.cart}>
                <div className={styles.header}>
                    <span className="heading6">
                        Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                    </span>

                    <button
                        className={styles.closeButton}
                        onClick={() => cartOpener.setIsOpen(false)}
                    >
                        <CloseIcon />
                    </button>
                </div>

                {cartItems.length > 0 ? (
                    <>
                        <div className={styles.cartItems}>
                            {cartItems.map((item) => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </div>

                        <div className={styles.footer}>
                            <>
                                <div className={styles.subtotal}>
                                    <span>Subtotal</span>
                                    <span>
                                        {
                                            cartTotals?.priceSummary?.subtotal
                                                ?.formattedConvertedAmount
                                        }
                                    </span>
                                </div>
                                <div className={styles.subtotalNote}>
                                    Taxes and shipping are calculated at checkout.
                                </div>
                            </>

                            <button
                                className={classNames(
                                    'button',
                                    'mutedPrimaryButton',
                                    styles.checkoutButton,
                                )}
                                onClick={handleCheckout}
                            >
                                Checkout
                            </button>

                            <div className={styles.secureCheckout}>
                                <LockIcon width={11} />
                                <span>Secure Checkout</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className={styles.emptyCartMessage}>Your cart is empty.</div>
                )}
            </div>
        </Drawer>
    );
};
