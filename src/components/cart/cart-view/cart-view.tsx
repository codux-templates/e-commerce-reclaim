import classNames from 'classnames';
import { Cart, CartTotals } from '~/lib/ecom';
import { calculateCartItemsCount, findLineItemPriceBreakdown } from '~/lib/utils';
import { CloseIcon, LockIcon } from '~/src/components/icons';
import { Spinner } from '~/src/components/spinner/spinner';
import { CartItem } from '../cart-item/cart-item';

import styles from './cart-view.module.scss';

export interface CartViewProps {
    cart?: Cart;
    cartTotals?: CartTotals;
    updatingCartItemIds?: string[];
    isUpdating?: boolean;
    isCheckoutInProgress: boolean;
    onClose: () => void;
    onCheckout: () => void;
    onViewCart: () => void;
    onItemQuantityChange: (args: { id: string; quantity: number }) => void;
    onItemRemove: (id: string) => void;
}

export const CartView = ({
    cart,
    cartTotals,
    updatingCartItemIds = [],
    isUpdating = false,
    isCheckoutInProgress,
    onClose,
    onCheckout,
    onViewCart,
    onItemQuantityChange,
    onItemRemove,
}: CartViewProps) => {
    const itemsCount = cart ? calculateCartItemsCount(cart) : 0;

    return (
        <div className={styles.cart}>
            <div className={styles.header}>
                <span className="heading6">
                    Cart ({itemsCount} {itemsCount === 1 ? 'item' : 'items'})
                </span>
                <button
                    className={classNames(styles.closeButton, 'button', 'transparentButton')}
                    onClick={onClose}
                >
                    <CloseIcon />
                </button>
            </div>

            {cart && cart.lineItems.length > 0 ? (
                <>
                    <div className={styles.cartItems}>
                        {cart.lineItems.map((item) => (
                            <CartItem
                                key={item._id}
                                item={item}
                                isUpdating={updatingCartItemIds.includes(item._id!)}
                                priceBreakdown={findLineItemPriceBreakdown(item, cartTotals)}
                                onQuantityChange={(quantity: number) =>
                                    onItemQuantityChange({ id: item._id!, quantity })
                                }
                                onRemove={() => onItemRemove(item._id!)}
                            />
                        ))}
                    </div>

                    <div className={styles.footer}>
                        {cart.subtotal && (
                            <>
                                <div className={styles.subtotal}>
                                    <span>Subtotal</span>
                                    <span>{cart.subtotal.formattedConvertedAmount}</span>
                                </div>
                                <div className={styles.subtotalNote}>
                                    Taxes and shipping are calculated at checkout.
                                </div>
                            </>
                        )}

                        <button
                            className={classNames(
                                'button',
                                'mutedPrimaryButton',
                                styles.checkoutButton,
                            )}
                            onClick={onCheckout}
                            disabled={isCheckoutInProgress || isUpdating}
                        >
                            {isCheckoutInProgress ? <Spinner size="1lh" /> : 'Checkout'}
                        </button>
                        <button
                            className={classNames('button', styles.viewCartButton)}
                            onClick={onViewCart}
                        >
                            View Cart
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
    );
};
