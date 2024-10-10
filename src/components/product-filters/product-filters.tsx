import { useCallback } from 'react';
import { IProductFilters } from '~/api/types';
import { formatPrice } from '~/utils';
import { useOptimisticSearchParamsState } from '~/utils/use-optimistic-search-params-state';
import { Accordion } from '../accordion/accordion';
import { RangeSlider } from '../range-slider/range-slider';

interface ProductFiltersProps {
    appliedFilters: IProductFilters;
    onFiltersChange: (filters: IProductFilters) => void;
    lowestPrice: number;
    highestPrice: number;
    currency: string;
}

export const ProductFilters = ({
    appliedFilters,
    onFiltersChange,
    lowestPrice,
    highestPrice,
    currency,
}: ProductFiltersProps) => {
    const [filters, setFilters] = useOptimisticSearchParamsState(appliedFilters, onFiltersChange);

    const formatPriceValue = useCallback(
        (price: number) => formatPrice(price, currency),
        [currency],
    );

    const handleFiltersChange = (changed: Partial<IProductFilters>) => {
        setFilters({ ...filters, ...changed });
    };

    return (
        <Accordion
            small
            items={[
                {
                    title: 'Price',
                    content: (
                        <RangeSlider
                            className="rangeSlider"
                            startValue={filters.minPrice ?? lowestPrice}
                            endValue={filters.maxPrice ?? highestPrice}
                            onStartValueChange={(value) => {
                                handleFiltersChange({ minPrice: value });
                            }}
                            onEndValueChange={(value) => {
                                handleFiltersChange({ maxPrice: value });
                            }}
                            minValue={lowestPrice}
                            maxValue={highestPrice}
                            formatValue={formatPriceValue}
                        />
                    ),
                },
            ]}
        />
    );
};
