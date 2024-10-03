import { useEffect, useState } from 'react';
import { useNavigation } from '@remix-run/react';
import { IProductFilters } from '~/api/types';
import { Accordion } from '../accordion/accordion';
import { RangeSlider } from '../range-slider/range-slider';

interface ProductFiltersProps {
    appliedFilters: IProductFilters;
    onFiltersChange: (filters: IProductFilters) => void;
    lowestPrice: number;
    highestPrice: number;
    formatPrice?: (value: number) => string;
}

export const ProductFilters = ({
    appliedFilters,
    onFiltersChange,
    lowestPrice,
    highestPrice,
    formatPrice,
}: ProductFiltersProps) => {
    const navigation = useNavigation();

    const [filters, setFilters] = useState(appliedFilters);

    const handleFiltersChange = (changed: Partial<IProductFilters>) => {
        const newFilters = { ...filters, ...changed };
        setFilters(newFilters);
        onFiltersChange(newFilters);
    };

    // Synchronize filters on back/forward browser button clicks.
    useEffect(() => {
        if (navigation.state !== 'loading') {
            setFilters(appliedFilters);
        }
    }, [navigation.state, appliedFilters]);

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
                            formatValue={formatPrice}
                        />
                    ),
                },
            ]}
        />
    );
};
