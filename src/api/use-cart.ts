import type { CartItem } from './types';
import { useEcomAPI } from './ecom-api-context-provider';
import { cart as cartType } from '@wix/ecom';
import { getCartItemSubtotal } from './cart-helpers';
import {
    useAddToCart,
    useCartAndTotals,
    useRemoveItemFromCart,
    useUpdateCartItemQuantity,
} from './api-hooks';
import { useEffect, useState } from 'react';
import { media } from '@wix/sdk';

export interface UseCartResult {
    cartItems: CartItem[];
    priceSummary?: cartType.PriceSummary;

    isCartMutating: boolean;
    isAddingToCart: boolean;

    triggerCartUpdate: () => void;
    triggerAddToCart: (args1: any, args2: any) => void; //  any temporarily
    handleCheckout: () => void;
}

export const useCart = (): UseCartResult => {
    const ecomAPI = useEcomAPI();
    const { data, isMutating: isCartMutating, trigger: triggerCartUpdate } = useCartAndTotals();
    const cart = data?.cart;
    const cartTotals = data?.totals;

    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const { trigger: triggerAddToCart, data: cartItemAdded, isMutating: isAddingToCart } = useAddToCart();

    const {
        trigger: removeItem,
        data: cartItemRemoved,
        isMutating: isRemovingItem,
    } = useRemoveItemFromCart();

    const {
        trigger: updateItemQuantity,
        data: quantityUpdated,
        isMutating: isUpdatingItemQuantity,
    } = useUpdateCartItemQuantity();

    useEffect(() => {
        if (cartItemRemoved || quantityUpdated || cartItemAdded) {
            triggerCartUpdate();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quantityUpdated, cartItemRemoved, cartItemAdded]);

    useEffect(() => {
        if (data) {
            setCartItems(computeCartItems());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const computeCartItems = () => {
        return (
            cart?.lineItems.map((item) => {
                return {
                    id: item._id!,
                    productName: item.productName?.translated ?? '',
                    quantity: item.quantity,
                    price: item.price,
                    subtotal: cartTotals ? getCartItemSubtotal(item, cartTotals) : undefined,
                    image: item.image ? media.getImageUrl(item.image) : undefined,
                    isUpdating: isRemovingItem || isUpdatingItemQuantity,
                    isUnavailable:
                        item.availability?.status === cartType.ItemAvailabilityStatus.NOT_AVAILABLE,
                    onRemove: () => removeItem(item._id!),
                    onQuantityChange: (quantity: number) =>
                        updateItemQuantity({ id: item._id!, quantity }),
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
        cartItems,
        priceSummary: cartTotals?.priceSummary,
        isCartMutating,
        isAddingToCart,
        triggerCartUpdate,
        triggerAddToCart,
        handleCheckout,
    };
};
