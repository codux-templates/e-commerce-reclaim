import { useCallback, useMemo } from 'react';
import { useSearchParams } from '@remix-run/react';
import { IProductFilters, ProductFilter } from '~/api/types';
import { mergeUrlSearchParams } from '~/utils';

export function useProductFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters = useMemo(
        () => convertUrlSearchParamsToProductFilters(searchParams),
        [searchParams],
    );

    const someFiltersApplied =
        Object.values(filters).length > 0 &&
        Object.values(filters).some((value) => value !== undefined);

    const applyFilters = useCallback(
        (filters: IProductFilters) => {
            setSearchParams(
                (params) => {
                    return mergeUrlSearchParams(
                        params,
                        convertProductFiltersToUrlSearchParams(filters),
                    );
                },
                { preventScrollReset: true },
            );
        },
        [setSearchParams],
    );

    const clearFilters = useCallback(
        (filters: ProductFilter[]) => {
            setSearchParams(
                (params) => {
                    filters.forEach((filter) => params.delete(filter));
                    return params;
                },
                { preventScrollReset: true },
            );
        },
        [setSearchParams],
    );

    const clearAllFilters = useCallback(() => {
        clearFilters(Object.values(ProductFilter));
    }, [clearFilters]);

    return {
        filters,
        someFiltersApplied,
        applyFilters,
        clearFilters,
        clearAllFilters,
    };
}

export function convertUrlSearchParamsToProductFilters(
    searchParams: URLSearchParams,
): IProductFilters {
    const minPrice = searchParams.get(ProductFilter.minPrice);
    const maxPrice = searchParams.get(ProductFilter.maxPrice);
    const minPriceNumber = Number(minPrice);
    const maxPriceNumber = Number(maxPrice);
    return {
        minPrice: minPrice && !Number.isNaN(minPriceNumber) ? minPriceNumber : undefined,
        maxPrice: maxPrice && !Number.isNaN(maxPriceNumber) ? maxPriceNumber : undefined,
    };
}

export function convertProductFiltersToUrlSearchParams({
    minPrice,
    maxPrice,
}: IProductFilters): URLSearchParams {
    const searchParams = new URLSearchParams();
    if (minPrice !== undefined) searchParams.set(ProductFilter.minPrice, minPrice.toString());
    if (maxPrice !== undefined) searchParams.set(ProductFilter.maxPrice, maxPrice.toString());
    return searchParams;
}
