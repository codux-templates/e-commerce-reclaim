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
    const {
        data: cartData,
        isMutating: isCartMutating,
        trigger: triggerCartUpdate,
    } = useCartAndTotals();
    const cart = cartData?.cart;
    const cartTotals = cartData?.totals;

    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const {
        trigger: triggerAddToCart,
        data: cartAfterItemAdded,
        isMutating: isAddingToCart,
    } = useAddToCart();

    const {
        trigger: removeItem,
        data: cartAfterItemRemoved,
        isMutating: isRemovingItem,
    } = useRemoveItemFromCart();

    const {
        trigger: updateItemQuantity,
        data: cartAfterQuantityUpdated,
        isMutating: isUpdatingItemQuantity,
    } = useUpdateCartItemQuantity();

    useEffect(() => {
        if (cartAfterItemRemoved || cartAfterQuantityUpdated || cartAfterItemAdded) {
            triggerCartUpdate();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartAfterQuantityUpdated, cartAfterItemRemoved, cartAfterItemAdded]);

    useEffect(() => {
        if (cartData) {
            setCartItems(computeCartItems());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartData]);

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
                    isUpdating: false, // here remember item who is waiting for the cart update
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
