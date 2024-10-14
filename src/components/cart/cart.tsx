import { Drawer } from '~/components/drawer/drawer';
import { useCartOpen } from './cart-open-context';
import { CartView } from './cart-view/cart-view';
import { useCart } from '~/hooks/use-cart';
import { ROUTES } from '~/router/config';
import { useNavigate } from '@remix-run/react';

export const Cart = () => {
    const { isOpen, setIsOpen } = useCartOpen();
    const navigate = useNavigate();
    const { cartData, cartTotals, checkout, removeItem, updateItemQuantity } = useCart();

    const handleViewCart = () => {
        setIsOpen(false);
        navigate(ROUTES.cart.to());
    };

    return (
        <Drawer onClose={() => setIsOpen(false)} open={isOpen}>
            <CartView
                cart={cartData}
                cartTotals={cartTotals}
                onClose={() => setIsOpen(false)}
                onCheckout={checkout}
                onViewCart={handleViewCart}
                onItemRemove={removeItem}
                onItemQuantityChange={updateItemQuantity}
            />
        </Drawer>
    );
};
