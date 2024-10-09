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
    priceBounds: { lowest: number; highest: number };
    className?: string;
}

export const AppliedProductFilters = ({
    appliedFilters,
    onClearFilters,
    onClearAllFilters,
    currency,
    priceBounds,
    className,
}: AppliedProductFiltersProps) => {
    const { minPrice, maxPrice } = appliedFilters;

    const priceFilter = useMemo<JSX.Element | null>(() => {
        if (minPrice === undefined && maxPrice === undefined) {
            return null;
        } else {
            return (
                <span>
                    {formatPrice(minPrice ?? priceBounds.lowest, currency)}&ndash;
                    {formatPrice(maxPrice ?? priceBounds.highest, currency)}
                </span>
            );
        }
    }, [minPrice, maxPrice, currency, priceBounds]);

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
