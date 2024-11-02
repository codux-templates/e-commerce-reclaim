import { useNavigate } from '@remix-run/react';
import { useCartOpen } from '~/lib/cart-open-context';
import { useCart, useCheckout } from '~/lib/ecom';
import { Drawer } from '~/src/components/drawer/drawer';
import { CartView } from './cart-view/cart-view';
import { getErrorMessage } from '~/lib/utils';

export const Cart = () => {
    const { isOpen, setIsOpen } = useCartOpen();
    const navigate = useNavigate();

    const { checkout, isCheckoutInProgress } = useCheckout({
        successUrl: '/thank-you',
        cancelUrl: '/products/all-products',
        onError: (error) => alert(getErrorMessage(error)),
    });

    const {
        cart,
        cartTotals,
        isCartUpdating,
        updatingCartItemIds,
        removeItem,
        updateItemQuantity,
    } = useCart();

    const handleViewCart = () => {
        setIsOpen(false);
        navigate('/cart');
    };

    return (
        <Drawer onClose={() => setIsOpen(false)} open={isOpen}>
            <CartView
                cart={cart.data}
                cartTotals={cartTotals}
                onClose={() => setIsOpen(false)}
                onViewCart={handleViewCart}
                onItemRemove={removeItem}
                onItemQuantityChange={updateItemQuantity}
                isCartUpdating={isCartUpdating}
                updatingCartItemIds={updatingCartItemIds}
                onCheckout={checkout}
                isCheckoutInProgress={isCheckoutInProgress}
            />
        </Drawer>
    );
};
