import { SerializeFrom } from '@remix-run/node';
import { useEffect, useState } from 'react';
import { getEcomApi, Product } from '../ecom';
import { getErrorMessage } from '../utils';
import { useAppliedProductFilters } from './use-applied-product-filters';
import { useProductSorting } from './use-product-sorting';

export function useProductsList(
    categorySlug: string,
    initialProducts: (Product | SerializeFrom<Product>)[],
    initialTotalCount: number,
) {
    const [products, setProducts] = useState(initialProducts);
    useEffect(() => {
        setProducts(initialProducts);
    }, [initialProducts]);

    const [totalProductsCount, setTotalProductsCount] = useState(initialTotalCount);
    useEffect(() => {
        setTotalProductsCount(initialTotalCount);
    }, [initialTotalCount]);

    const [isLoadingProducts, setIsLoadingProducts] = useState(false);

    const api = getEcomApi();
    const { appliedFilters } = useAppliedProductFilters();
    const { productsSortBy } = useProductSorting();

    const loadMore = async () => {
        setIsLoadingProducts(true);

        try {
            const nextProductsResponse = await api.getProductsByCategory(categorySlug, {
                filters: appliedFilters,
                sortBy: productsSortBy,
                skip: products.length,
            });

            if (nextProductsResponse.status === 'success') {
                setProducts((prev) => [...prev, ...nextProductsResponse.body.items]);
                setTotalProductsCount(nextProductsResponse.body.totalCount);
            } else {
                throw nextProductsResponse.error;
            }
        } catch (e) {
            alert(getErrorMessage(e));
        } finally {
            setIsLoadingProducts(false);
        }
    };

    return {
        products,
        totalProductsCount,
        isLoadingProducts,
        loadMore,
        canLoadMore: products.length < totalProductsCount,
    };
}
