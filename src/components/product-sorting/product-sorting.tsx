import { useEffect, useState } from 'react';
import { useNavigation } from '@remix-run/react';
import { useProductSorting } from '~/api/product-sorting';
import { ProductSortBy } from '~/api/types';
import { Select, SelectItem } from '../select/select';

import styles from './product-sorting.module.scss';

const sortingOptions: { value: ProductSortBy; label: string }[] = [
    { value: ProductSortBy.newest, label: 'Newest' },
    { value: ProductSortBy.priceAsc, label: 'Price (low to high)' },
    { value: ProductSortBy.priceDesc, label: 'Price (high to low)' },
    { value: ProductSortBy.nameAsc, label: 'Name A-Z' },
    { value: ProductSortBy.nameDesc, label: 'Name Z-A' },
];

const defaultSortBy = ProductSortBy.newest;

export const ProductSorting = () => {
    const navigation = useNavigation();

    const { appliedSortBy, applySortBy } = useProductSorting();
    const [sortBy, setSortBy] = useState(appliedSortBy ?? defaultSortBy);

    const selectedOption = sortingOptions.find((option) => option.value === sortBy)!;

    const handleSelectChange = (value: ProductSortBy) => {
        setSortBy(value);
        applySortBy(value);
    };

    useEffect(() => {
        if (navigation.state !== 'loading') {
            setSortBy(appliedSortBy ?? defaultSortBy);
        }
    }, [appliedSortBy, navigation.state]);

    return (
        <Select
            value={sortBy}
            onValueChange={handleSelectChange}
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
