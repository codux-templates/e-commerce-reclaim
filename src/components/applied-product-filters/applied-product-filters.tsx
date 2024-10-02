import { useMemo } from 'react';
import classNames from 'classnames';
import { ProductFilter, IProductFilters } from '~/api/types';
import { AppliedFilter } from '../applied-filter/applied-filter';

import styles from './applied-product-filters.module.scss';

interface AppliedProductFiltersProps {
    appliedFilters: IProductFilters;
    onClearFilters: (filters: ProductFilter[]) => void;
    onClearAllFilters: () => void;
    formatPrice?: (value: number) => string;
    className?: string;
}

export const AppliedProductFilters = ({
    appliedFilters,
    onClearFilters,
    onClearAllFilters,
    formatPrice = (value) => value.toString(),
    className,
}: AppliedProductFiltersProps) => {
    const { minPrice, maxPrice } = appliedFilters;

    const priceFilter = useMemo<JSX.Element | null>(() => {
        if (minPrice === undefined && maxPrice === undefined) {
            return null;
        } else if (minPrice !== undefined && maxPrice !== undefined) {
            return (
                <span>
                    {formatPrice(minPrice)}&ndash;{formatPrice(maxPrice)}
                </span>
            );
        } else {
            return (
                <span>
                    {minPrice !== undefined ? formatPrice(minPrice) : formatPrice(maxPrice!)}
                </span>
            );
        }
    }, [minPrice, maxPrice, formatPrice]);

    return (
        <div className={classNames(styles.root, className)}>
            {priceFilter && (
                <AppliedFilter
                    onClick={() => {
                        onClearFilters([ProductFilter.minPrice, ProductFilter.maxPrice]);
                    }}
                >
                    {priceFilter}
                </AppliedFilter>
            )}

            <button className={styles.clearAllButton} onClick={onClearAllFilters}>
                Clear All
            </button>
        </div>
    );
};
