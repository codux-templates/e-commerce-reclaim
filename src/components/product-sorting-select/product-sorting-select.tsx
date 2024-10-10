import { useCallback, useMemo } from 'react';
import { useSearchParams } from '@remix-run/react';
import { getProductSortByFromUrlSearchParams, SORT_BY_SEARCH_PARAM } from '~/api/product-sorting';
import { ProductSortBy } from '~/api/types';
import { useOptimisticSearchParamsState } from '~/utils/use-optimistic-search-params-state';
import { Select, SelectItem } from '../select/select';

import styles from './product-sorting-select.module.scss';

const sortingOptions: { value: ProductSortBy; label: string }[] = [
    { value: ProductSortBy.newest, label: 'Newest' },
    { value: ProductSortBy.priceAsc, label: 'Price (low to high)' },
    { value: ProductSortBy.priceDesc, label: 'Price (high to low)' },
    { value: ProductSortBy.nameAsc, label: 'Name A-Z' },
    { value: ProductSortBy.nameDesc, label: 'Name Z-A' },
];

export const ProductSortingSelect = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const appliedSortBy = useMemo(
        () => getProductSortByFromUrlSearchParams(searchParams),
        [searchParams],
    );

    const applySortBy = useCallback(
        (sortBy: ProductSortBy) => {
            setSearchParams(
                (params) => {
                    params.set(SORT_BY_SEARCH_PARAM, sortBy);
                    return params;
                },
                { preventScrollReset: true },
            );
        },
        [setSearchParams],
    );

    const [sortBy, setSortBy] = useOptimisticSearchParamsState(appliedSortBy, applySortBy);

    const selectedOption = sortingOptions.find((option) => option.value === sortBy)!;

    return (
        <Select
            value={sortBy}
            onValueChange={setSortBy}
            className={styles.select}
            dropdownClassName={styles.selectDropdown}
            customSelectedValue={`Sort by: ${selectedOption.label}`}
        >
            {sortingOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className={styles.selectItem}>
                    {option.label}
                </SelectItem>
            ))}
        </Select>
    );
};
