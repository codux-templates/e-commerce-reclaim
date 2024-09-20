import { useEffect, useState } from 'react';
import { ProductCard } from '../product-card/product-card';
import { ProductLink } from '../product-link/product-link';
import styles from './featured-products-section.module.scss';
import { collections } from '@wix/stores';
import { getEcomApi } from '~/api/ecom-api';
import { Product } from '@wix/stores_products';
import classNames from 'classnames';

interface FeaturedProductsData {
    category: collections.Collection;
    products: Product[];
}

const getFeaturedProducts = async (
    categorySlug: string,
    limit: number
): Promise<FeaturedProductsData | null> => {
    const api = getEcomApi();

    let category: collections.Collection;
    try {
        category = await api.getCategoryBySlug(categorySlug);
    } catch (error) {
        try {
            category = await api.getCategoryBySlug('all-products');
        } catch (error) {
            return null;
        }
    }

    try {
        const products = await api.getProductsByCategory(category.slug, limit);
        return { category, products };
    } catch (error) {
        return null;
    }
};

interface FeaturedProductsSectionProps {
    categorySlug: string;
    title?: string;
    description?: JSX.Element | string;
    limit?: number;
    className?: string;
}

export const FeaturedProductsSection = (props: FeaturedProductsSectionProps) => {
    const { title, description, limit = 4, categorySlug, className } = props;

    const [data, setData] = useState<FeaturedProductsData | null>(null);

    useEffect(() => {
        getFeaturedProducts(categorySlug, limit).then((fetchedData) => {
            setData(fetchedData);
        });
    }, [categorySlug, limit]);

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.header}>
                <h1 className={styles.headerTitle}>{title ?? data?.category.name ?? ''}</h1>
                <div className={styles.headerDescription}>
                    {description ?? data?.category.description ?? ''}
                </div>
            </div>
            {data && (
                <div className={styles.productsRow}>
                    {data.products.map((product) => (
                        <ProductLink key={product._id} productSlug={product.slug!}>
                            <ProductCard
                                name={product.name!}
                                imageUrl={product.media?.mainMedia?.image?.url}
                                priceData={product.priceData}
                                ribbon={product.ribbon ?? undefined}
                            />
                        </ProductLink>
                    ))}
                </div>
            )}
        </div>
    );
};
