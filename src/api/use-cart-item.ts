import { useState } from 'react';
import { CartItem } from './types';
import debounce from 'lodash.debounce';

export const useCartItem = (item: CartItem) => {
    const [quantity, setQuantity] = useState(item.quantity!);

    const onQuantityChange = (value: number) => {
        setQuantity(value);
        if (value > 0) {
            debounce(() => item.onQuantityChange(value), 300);
        }
    };

    return {
        quantity,
        onQuantityChange,
    };
};
