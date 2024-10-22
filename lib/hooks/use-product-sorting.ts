import { useSearchParams } from '@remix-run/react';
import { useMemo } from 'react';
import { productSortByFromSearchParams } from '../ecom';

export function useProductSorting() {
    const [searchParams] = useSearchParams();
    const productsSortBy = useMemo(
        () => productSortByFromSearchParams(searchParams),
        [searchParams],
    );
    return {
        productsSortBy,
    };
}
