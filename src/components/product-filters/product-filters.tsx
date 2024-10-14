import { useCallback } from 'react';
import { IProductFilters } from '~/api/types';
import { productFiltersSearchParamsConverter } from '~/api/use-product-filters';
import { formatPrice } from '~/utils';
import { useSearchParamsState } from '~/utils/use-search-params-state';
import { Accordion } from '../accordion/accordion';
import { RangeSlider } from '../range-slider/range-slider';

interface ProductFiltersProps {
    lowestPrice: number;
    highestPrice: number;
    currency: string;
}

export const ProductFilters = ({ lowestPrice, highestPrice, currency }: ProductFiltersProps) => {
    const [filters, setFilters] = useSearchParamsState(productFiltersSearchParamsConverter);

    const handleFiltersChange = (changed: Partial<IProductFilters>) => {
        setFilters({ ...filters, ...changed });
    };

    const formatPriceValue = useCallback(
        (price: number) => formatPrice(price, currency),
        [currency],
    );

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
