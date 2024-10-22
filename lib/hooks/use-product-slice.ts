import { SerializeFrom } from '@remix-run/node';
import { useEffect, useState } from 'react';
import { getEcomApi, IProductFilters, Product, ProductSortBy, Slice } from '../ecom';
import { getErrorMessage } from '../utils';

/**
 * Manages product slicing and loads next slices from the client side
 * without a full page reload. Syncs with initialSlice data from the page loader.
 */
export function useProductSlice(
    categorySlug: string,
    filters: IProductFilters,
    sortBy: ProductSortBy,
    initialSlice: Slice<Product | SerializeFrom<Product>>,
) {
    const [productSlice, setProductSlice] = useState(initialSlice);
    useEffect(() => {
        setProductSlice(initialSlice);
    }, [initialSlice]);

    const [isLoadingProducts, setIsLoadingProducts] = useState(false);

    const api = getEcomApi();
    const loadMore = async () => {
        setIsLoadingProducts(true);

        try {
            const nextProductsResponse = await api.getProductsByCategory(categorySlug, {
                filters,
                sortBy,
                skip: productSlice.items.length,
            });

            if (nextProductsResponse.status === 'success') {
                setProductSlice((prev) => ({
                    totalCount: nextProductsResponse.body.totalCount,
                    items: [...prev.items, ...nextProductsResponse.body.items],
                }));
            } else {
                throw new Error('Failed to load products', { cause: nextProductsResponse.error });
            }
        } catch (e) {
            alert(getErrorMessage(e));
        } finally {
            setIsLoadingProducts(false);
        }
    };

    return {
        productSlice,
        isLoadingProducts,
        loadMore,
        canLoadMore: productSlice.items.length < productSlice.totalCount,
    };
}
