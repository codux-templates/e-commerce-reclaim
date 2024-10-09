import { useMemo } from 'react';
import classNames from 'classnames';
import { ProductFilter, IProductFilters } from '~/api/types';
import { formatPrice } from '~/utils';
import { AppliedFilter } from '../applied-filter/applied-filter';

import styles from './applied-product-filters.module.scss';

interface AppliedProductFiltersProps {
    appliedFilters: IProductFilters;
    onClearFilters: (filters: ProductFilter[]) => void;
    onClearAllFilters: () => void;
    currency: string;
    defaultPriceFilters: { minPrice: number; maxPrice: number };
    className?: string;
}

export const AppliedProductFilters = ({
    appliedFilters,
    onClearFilters,
    onClearAllFilters,
    currency,
    defaultPriceFilters,
    className,
}: AppliedProductFiltersProps) => {
    const { minPrice, maxPrice } = appliedFilters;

    const priceFilter = useMemo<JSX.Element | null>(() => {
        if (minPrice === undefined && maxPrice === undefined) {
            return null;
        } else {
            return (
                <span>
                    {formatPrice(minPrice ?? defaultPriceFilters.minPrice, currency)}&ndash;
                    {formatPrice(maxPrice ?? defaultPriceFilters.maxPrice, currency)}
                </span>
            );
        }
    }, [minPrice, maxPrice, currency, defaultPriceFilters]);

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
