import { useCallback, useMemo } from 'react';
import { useSearchParams } from '@remix-run/react';
import { IProductFilters, ProductFilter } from '~/api/types';
import type { SearchParamsStateConverter } from '../utils/use-search-params-state';

export function useAppliedProductFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const appliedFilters = useMemo(
        () => productFiltersSearchParamsConverter.fromSearchParams(searchParams),
        [searchParams],
    );

    const someFiltersApplied =
        Object.values(appliedFilters).length > 0 &&
        Object.values(appliedFilters).some((value) => value !== undefined);

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
        appliedFilters,
        someFiltersApplied,
        clearFilters,
        clearAllFilters,
    };
}

export const productFiltersSearchParamsConverter: SearchParamsStateConverter<IProductFilters> = {
    fromSearchParams: (params) => {
        const minPrice = params.get(ProductFilter.minPrice);
        const maxPrice = params.get(ProductFilter.maxPrice);
        const minPriceNumber = Number(minPrice);
        const maxPriceNumber = Number(maxPrice);
        return {
            minPrice: minPrice && !Number.isNaN(minPriceNumber) ? minPriceNumber : undefined,
            maxPrice: maxPrice && !Number.isNaN(maxPriceNumber) ? maxPriceNumber : undefined,
        };
    },
    toSearchParams: ({ minPrice, maxPrice }) => {
        const params = new URLSearchParams();
        if (minPrice !== undefined) params.set(ProductFilter.minPrice, minPrice.toString());
        if (maxPrice !== undefined) params.set(ProductFilter.maxPrice, maxPrice.toString());
        return params;
    },
};
