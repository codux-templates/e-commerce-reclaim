import { useState } from 'react';
import {
    useCartTotals,
    useCartData,
    useUpdateCartItemQuantity,
    useRemoveItemFromCart,
} from '~/api/api-hooks';
import { useEcomAPI } from '~/api/ecom-api-context-provider';

export const useCart = () => {
    const ecomAPI = useEcomAPI();
    const [updatingCartItems, setUpdatingCartItems] = useState<string[]>([]);

    const { data: cartData } = useCartData();
    const { data: cartTotalsData, isUpdatingOnCartChange: isCartTotalsUpdatingOnCartChange } =
        useCartTotals();
    const cartTotals = cartTotalsData?.data;

    const { trigger: triggerUpdateItemQuantity } = useUpdateCartItemQuantity();
    const { trigger: triggerRemoveItem } = useRemoveItemFromCart();

    const updateItemQuantity = async ({ id, quantity }: { id: string; quantity: number }) => {
        setUpdatingCartItems((prev) => [...prev, id]);
        await triggerUpdateItemQuantity({ id, quantity });
        setUpdatingCartItems((prev) => prev.filter((itemId) => itemId !== id));
    };

    const removeItem = async (id: string) => {
        setUpdatingCartItems((prev) => [...prev, id]);
        await triggerRemoveItem(id);
        setUpdatingCartItems((prev) => prev.filter((itemId) => itemId !== id));
    };

    const checkout = async () => {
        const checkoutResponse = await ecomAPI.checkout();

        if (checkoutResponse.status === 'success') {
            window.location.href = checkoutResponse.body.checkoutUrl;
        } else {
            alert('checkout is not configured');
        }
    };

    return {
        cartData,
        cartTotals,
        isCartItemUpdating: (id: string) => updatingCartItems.includes(id),
        isCartTotalsUpdating: updatingCartItems.length > 0 || isCartTotalsUpdatingOnCartChange,
        updateItemQuantity,
        removeItem,
        checkout,
    };
};
