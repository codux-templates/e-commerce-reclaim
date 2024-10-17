import { useState } from 'react';
import {
    useCartTotals,
    useCartData,
    useUpdateCartItemQuantity,
    useRemoveItemFromCart,
    useAddToCart,
} from '~/api/api-hooks';
import { useEcomAPI } from '~/api/ecom-api-context-provider';
import { AddToCartOptions } from '~/api/types';
import { ToastType, useToaster } from '~/components/toaster/toaster-context';
import { getErrorMessage } from '~/utils';

export const useCart = () => {
    const ecomAPI = useEcomAPI();
    const { runToast } = useToaster();
    const [updatingCartItemIds, setUpdatingCartItems] = useState<string[]>([]);

    const { data: cartData } = useCartData();
    const { data: cartTotals, isValidating: isCartTotalsValidating } = useCartTotals();

    const { trigger: triggerUpdateItemQuantity } = useUpdateCartItemQuantity();
    const { trigger: triggerRemoveItem } = useRemoveItemFromCart();
    const { trigger: triggerAddToCart, isMutating: isAddingToCart } = useAddToCart();

    const updateItemQuantity = ({ id, quantity }: { id: string; quantity: number }) => {
        setUpdatingCartItems((prev) => [...prev, id]);
        triggerUpdateItemQuantity({ id, quantity })
            .catch((error) =>
                runToast({
                    type: ToastType.Error,
                    message: `Failed to update the item quantity. ${getErrorMessage(error)}`,
                }),
            )
            .finally(() => {
                setUpdatingCartItems((prev) => prev.filter((itemId) => itemId !== id));
            });
    };

    const removeItem = (id: string) => {
        setUpdatingCartItems((prev) => [...prev, id]);
        triggerRemoveItem(id)
            .catch((error) =>
                runToast({
                    type: ToastType.Error,
                    message: `Failed to remove the item. ${getErrorMessage(error)}`,
                }),
            )
            .finally(() => {
                setUpdatingCartItems((prev) => prev.filter((itemId) => itemId !== id));
            });
    };

    const addToCart = (productId: string, quantity: number, options?: AddToCartOptions) => {
        triggerAddToCart({ id: productId, quantity }).catch((error) =>
            runToast({
                type: ToastType.Error,
                message: `Failed to add product to the cart. ${getErrorMessage(error)}`,
            }),
        );
    };

    const checkout = async () => {
        const checkoutResponse = await ecomAPI.checkout();

        if (checkoutResponse.status === 'success') {
            window.location.href = checkoutResponse.body.checkoutUrl;
        } else {
            runToast({
                type: ToastType.Error,
                message: `Checkout is not configured. ${getErrorMessage(checkoutResponse.error)}`,
            });
        }
    };

    return {
        cartData,
        cartTotals,
        updatingCartItemIds,

        isAddingToCart,
        isCartTotalsUpdating: updatingCartItemIds.length > 0 || isCartTotalsValidating,

        updateItemQuantity,
        removeItem,
        addToCart,
        checkout,
    };
};
