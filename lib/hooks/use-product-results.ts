import { SerializeFrom } from '@remix-run/node';
import { useEffect, useState } from 'react';
import { getEcomApi, IProductFilters, Product, ProductSortBy, Slice } from '../ecom';
import { getErrorMessage } from '../utils';

export interface UseProductResultsArgs {
    categorySlug: string;
    filters: IProductFilters;
    sorting: ProductSortBy;
    initialResultsFromLoader: Slice<Product | SerializeFrom<Product>>;
}

/**
 * Manages product slicing and loads next slices from the client side
 * without a full page reload. Syncs with initialResultsFromLoader.
 */
export function useProductResults({
    categorySlug,
    filters,
    sorting,
    initialResultsFromLoader,
}: UseProductResultsArgs) {
    const [productSlice, setProductSlice] = useState(initialResultsFromLoader);
    useEffect(() => {
        setProductSlice(initialResultsFromLoader);
    }, [initialResultsFromLoader]);

    const [isLoadingMoreProducts, setIsLoadingMoreProducts] = useState(false);

    const api = getEcomApi();
    const loadMoreProducts = async () => {
        setIsLoadingMoreProducts(true);

        try {
            const nextProductsResponse = await api.getProductsByCategory(categorySlug, {
                filters,
                sortBy: sorting,
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
            setIsLoadingMoreProducts(false);
        }
    };

    return {
        products: productSlice.items,
        totalProducts: productSlice.totalCount,
        isLoadingMoreProducts,
        loadMoreProducts,
    };
}
