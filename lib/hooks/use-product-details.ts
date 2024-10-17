import { useCallback, useState } from 'react';
import { products } from '@wix/stores';
import type { SerializeFrom } from '@remix-run/node';
import { useAddToCart } from '../api/api-hooks';
import { AddToCartOptions } from '../api/types';
import {
    getMedia,
    getPriceData,
    getProductOptions,
    getSelectedVariant,
    getSKU,
    isOutOfStock,
    selectedChoicesToVariantChoices,
} from '../utils/product-utils';
import { useCartOpen } from '../cart-open-context';

export function useProductDetails(product: SerializeFrom<products.Product>) {
    const cartOpener = useCartOpen();
    const { trigger: addToCart, isMutating: isAddingToCart } = useAddToCart();

    const getInitialSelectedChoices = () => {
        const result: Record<string, products.Choice | undefined> = {};
        for (const option of product.productOptions ?? []) {
            if (option.name) {
                result[option.name] = option?.choices?.length === 1 ? option.choices[0] : undefined;
            }
        }

        return result;
    };

    const [selectedChoices, setSelectedChoices] = useState(() => getInitialSelectedChoices());
    const [quantity, setQuantity] = useState(1);
    const [addToCartAttempted, setAddToCartAttempted] = useState(false);

    const outOfStock = isOutOfStock(product, selectedChoices);
    const priceData = getPriceData(product, selectedChoices);
    const sku = getSKU(product, selectedChoices);
    const media = getMedia(product, selectedChoices);
    const productOptions = getProductOptions(product, selectedChoices);

    const handleAddToCart = useCallback(() => {
        setAddToCartAttempted(true);

        if (Object.values(selectedChoices).includes(undefined)) return;

        const selectedVariant = getSelectedVariant(product, selectedChoices);

        const options: AddToCartOptions =
            product.manageVariants && selectedVariant?._id
                ? { variantId: selectedVariant._id }
                : { options: selectedChoicesToVariantChoices(product, selectedChoices) };

        addToCart(
            {
                id: product._id!,
                quantity,
                options,
            },
            {
                onSuccess: () => cartOpener.setIsOpen(true),
            },
        );
    }, [addToCart, cartOpener, product, quantity, selectedChoices]);

    const handleOptionChange = useCallback((optionName: string, newChoice: products.Choice) => {
        setQuantity(1);
        setSelectedChoices((prev) => ({
            ...prev,
            [optionName]: newChoice,
        }));
    }, []);

    return {
        outOfStock,
        priceData,
        sku,
        media,
        productOptions,
        quantity,
        selectedChoices,
        isAddingToCart,
        addToCartAttempted,
        handleAddToCart,
        handleOptionChange,
        handleQuantityChange: setQuantity,
    };
}
