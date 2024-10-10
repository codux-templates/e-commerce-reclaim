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

export interface UseCartResult {
    cartTotals?: CartTotals;
    cartItems: CartItem[];
    isAddingToCart: boolean;
    addToCart: (args1: any, args2: any) => void; //  any temporarily
    handleCheckout: () => void;
}

export const useCart = (): UseCartResult => {
    const ecomAPI = useEcomAPI();
    const { data: cartData } = useCartTotals();

    const { trigger: triggerAddToCart, isMutating: isAddingToCart } = useAddToCart();
    const addToCart = (args1: any, args2: any) => {
        triggerAddToCart(args1, {
            onSuccess: () => {
                cartData.mutate();
                args2.onSuccess();
            },
        });
    };

    const {
        trigger: triggerRemoveItem,
        // isMutating: isRemovingItem,
    } = useRemoveItemFromCart();

    const {
        trigger: triggerUpdateItemQuantity,
        // isMutating: isUpdatingItemQuantity,
    } = useUpdateCartItemQuantity();

    const onCartChangeSuccess = () => {
        cartData.mutate();
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
                    isUpdating: false, // here remember item who is waiting for the cart update
                    isUnavailable:
                        item.availability?.status === cartType.ItemAvailabilityStatus.NOT_AVAILABLE,
                    onRemove: () =>
                        triggerRemoveItem(item._id!, { onSuccess: onCartChangeSuccess }),
                    onQuantityChange: (quantity: number) =>
                        triggerUpdateItemQuantity(
                            { id: item._id!, quantity },
                            { onSuccess: onCartChangeSuccess },
                        ),
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

        addToCart,
        handleCheckout,
    };
};
