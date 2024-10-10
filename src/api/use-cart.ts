import type { CartItem, CartTotals } from './types';
import { useEcomAPI } from './ecom-api-context-provider';
import { cart as cartType } from '@wix/ecom';
import { getCartItemSubtotal } from './cart-helpers';
import {
    useAddToCart,
    useCartTotals,
    useRemoveItemFromCart,
    useUpdateCartItemQuantity,
} from './api-hooks';
import { media } from '@wix/sdk';
import { useState } from 'react';

export interface UseCartResult {
    cartTotals?: CartTotals;
    cartItems: CartItem[];
    isAddingToCart: boolean;
    isCartTotalUpdating: boolean;
    addToCart: (args1: any, args2: any) => void; //  any temporarily
    handleCheckout: () => void;
}

export const useCart = (): UseCartResult => {
    const ecomAPI = useEcomAPI();
    const { data: cartData } = useCartTotals();
    const [updatingCartItemIds, setUpdatingCartItemIds] = useState<string[]>([]);

    const { trigger: triggerAddToCart, isMutating: isAddingToCart } = useAddToCart();
    const addToCart = (args1: any, args2: any) => {
        triggerAddToCart(args1, {
            onSuccess: async () => {
                await onCartChangeSuccess();
                args2.onSuccess();
            },
        });
    };

    const {
        trigger: triggerRemoveItem,
    } = useRemoveItemFromCart();
    const removeItem = (id: string) => {
        setUpdatingCartItemIds((cartItemIds) => [...cartItemIds, id]);
        triggerRemoveItem(id, {
            onSuccess: async () => {
                await onCartChangeSuccess();
                setUpdatingCartItemIds((cartItemIds) =>
                    cartItemIds.filter((itemId) => itemId !== id),
                );
            },
        });
    };

    const {
        trigger: triggerUpdateItemQuantity,
    } = useUpdateCartItemQuantity();
    const updateItemQuantity = (id: string, quantity: number) => {
        setUpdatingCartItemIds((cartItemIds) => [...cartItemIds, id]);
        triggerUpdateItemQuantity(
            { id, quantity },
            {
                onSuccess: async () => {
                    await onCartChangeSuccess();
                    setUpdatingCartItemIds((cartItemIds) =>
                        cartItemIds.filter((itemId) => itemId !== id),
                    );
                },
            },
        );
    };

    const onCartChangeSuccess = async () => {
        await cartData.mutate();
    };

    const computeCartItems = () => {
        return (
            cartData?.data?.cart?.lineItems.map((item) => {
                return {
                    id: item._id!,
                    productName: item.productName?.translated ?? '',
                    quantity: item.quantity,
                    price: item.price,
                    subtotal: cartData?.data ? getCartItemSubtotal(item, cartData.data) : undefined,
                    image: item.image ? media.getImageUrl(item.image) : undefined,
                    isUpdating: updatingCartItemIds.includes(item._id!),
                    isUnavailable:
                        item.availability?.status === cartType.ItemAvailabilityStatus.NOT_AVAILABLE,
                    onRemove: () => removeItem(item._id!),
                    onQuantityChange: (quantity: number) => updateItemQuantity(item._id!, quantity),
                };
            }) ?? []
        );
    };

    const handleCheckout = async () => {
        const checkoutResponse = await ecomAPI.checkout();

        if (checkoutResponse.status === 'success') {
            window.location.href = checkoutResponse.body.checkoutUrl;
        } else {
            alert('Checkout failed.');
        }
    };

    return {
        cartTotals: cartData?.data,
        cartItems: computeCartItems(),

        isAddingToCart,
        isCartTotalUpdating: updatingCartItemIds.length > 0 || cartData.isValidating,

        addToCart,
        handleCheckout,
    };
};
