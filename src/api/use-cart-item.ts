import { useEffect, useMemo, useState } from 'react';
import { CartItem } from './types';
import debounce from 'lodash.debounce';

export const useCartItem = (item: CartItem) => {
    const [quantity, setQuantity] = useState(item.quantity!);

    useEffect(() => {
        setQuantity(item.quantity!);
    }, [item.quantity]);

    const updateItemQuantityDebounced = useMemo(() => debounce(item.onQuantityChange, 300), [item]);
    const onQuantityChange = (value: number) => {
        setQuantity(value);
        if (value > 0) {
            updateItemQuantityDebounced(value);
        }
    };

    return {
        quantity,
        onQuantityChange,
    };
};
