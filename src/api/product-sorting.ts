import { useCallback, useMemo } from 'react';
import { useSearchParams } from '@remix-run/react';
import { products } from '@wix/stores';
import { ProductSortBy } from './types';

const SORT_BY_SEARCH_PARAM = 'sortBy';

export function useProductSorting() {
    const [searchParams, setSearchParams] = useSearchParams();

    const appliedSortBy = useMemo(
        () => getProductSortByFromUrlSearchParams(searchParams),
        [searchParams],
    );

    const applySortBy = useCallback(
        (sortBy: ProductSortBy) => {
            setSearchParams((params) => {
                params.set(SORT_BY_SEARCH_PARAM, sortBy);
                return params;
            });
        },
        [setSearchParams],
    );

    return { appliedSortBy, applySortBy };
}

export function getProductSortByFromUrlSearchParams(
    searchParams: URLSearchParams,
): ProductSortBy | undefined {
    const value = searchParams.get(SORT_BY_SEARCH_PARAM);
    return value && Object.values(ProductSortBy).includes(value as ProductSortBy)
        ? (value as ProductSortBy)
        : undefined;
}

export function getSortedProductsQuery(
    query: products.ProductsQueryBuilder,
    sortBy: ProductSortBy,
): products.ProductsQueryBuilder {
    switch (sortBy) {
        case ProductSortBy.newest:
            // numericId is incremented when creating new products,
            // so we can use it to sort products by creation date - from the newest to the oldest.
            return query.descending('numericId');
        case ProductSortBy.priceAsc:
            return query.ascending('price');
        case ProductSortBy.priceDesc:
            return query.descending('price');
        case ProductSortBy.nameAsc:
            return query.ascending('name');
        case ProductSortBy.nameDesc:
            return query.descending('name');
    }
}
