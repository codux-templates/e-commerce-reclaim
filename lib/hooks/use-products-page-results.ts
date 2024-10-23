import { SerializeFrom } from '@remix-run/node';
import { useEffect, useRef, useState } from 'react';
import { getEcomApi, IProductFilters, Product, ProductSortBy } from '../ecom';
import { getErrorMessage } from '../utils';

export interface ProductsPageResults {
    products: (Product | SerializeFrom<Product>)[];
    totalProducts: number;
}

export interface UseProductsPageResultsArgs {
    categorySlug: string;
    filters: IProductFilters;
    sorting: ProductSortBy;
    resultsFromLoader: ProductsPageResults;
}

/**
 * Returns the list of products displayed on the products page.
 *
 * @param resultsFromLoader The initial batch of results obtained from the route loader,
 * to avoid redundant fetching on the client side.
 */
export function useProductsPageResults({
    categorySlug,
    filters,
    sorting,
    resultsFromLoader,
}: UseProductsPageResultsArgs) {
    const [results, setResults] = useState(resultsFromLoader);

    const resultsFromLoaderVersionRef = useRef(0);

    // When the filters or category change, the loader fetches the first batch of new
    // results without a full-page reload, and we need to reset the state of this hook.
    useEffect(() => {
        setResults(resultsFromLoader);

        return () => {
            resultsFromLoaderVersionRef.current = resultsFromLoaderVersionRef.current + 1;
        };
    }, [resultsFromLoader]);

    const [isLoadingMoreProducts, setIsLoadingMoreProducts] = useState(false);

    const api = getEcomApi();
    const loadMoreProducts = async () => {
        setIsLoadingMoreProducts(true);

        const resultsFromLoaderVersion = resultsFromLoaderVersionRef.current;
        try {
            const nextProductsResponse = await api.getProductsByCategory(categorySlug, {
                filters,
                sortBy: sorting,
                skip: results.products.length,
            });

            if (nextProductsResponse.status === 'success') {
                // ignore data if loading started for other loader data
                if (resultsFromLoaderVersion !== resultsFromLoaderVersionRef.current) {
                    return;
                }

                setResults((prev) => ({
                    totalProducts: nextProductsResponse.body.totalCount,
                    products: [...prev.products, ...nextProductsResponse.body.items],
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
        products: results.products,
        totalProducts: results.totalProducts,
        isLoadingMoreProducts,
        loadMoreProducts,
    };
}
