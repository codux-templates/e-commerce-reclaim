import { ProductCard } from '../product-card/product-card';
import { ProductLink } from '../product-link/product-link';
import styles from './featured-products-section.module.scss';
import { collections } from '@wix/stores';
import { getEcomApi, isEcomSDKError } from '~/api/ecom-api';
import { Product } from '@wix/stores_products';
import classNames from 'classnames';
import useSWR from 'swr';

interface FeaturedProductsData {
    category: collections.Collection;
    products: Product[];
}

const getFeaturedProducts = async (
    categorySlug: string,
    limit: number
): Promise<FeaturedProductsData | null> => {
    const api = getEcomApi();

    let category: collections.Collection | undefined;
    try {
        category =
            (await api.getCategoryBySlug(categorySlug)) ||
            (await api.getCategoryBySlug('all-products'));
    } catch (error) {
        if (isEcomSDKError(error) && error.details.applicationError.code === 404) {
            category = await api.getCategoryBySlug('all-products');
        } else {
            throw error;
        }
    }
    if (!category) throw new Error("Category 'all-products' not found");

    const products = await api.getProductsByCategory(category.slug!, limit);
    return { category, products };
};

interface FeaturedProductsSectionProps {
    categorySlug: string;
    title?: string;
    description?: JSX.Element | string;
    productCount?: number;
    className?: string;
}

export const FeaturedProductsSection = (props: FeaturedProductsSectionProps) => {
    const { title, description, productCount = 4, categorySlug, className } = props;

    const { data } = useSWR(`/category/${categorySlug}/featured/limit/${productCount}`, () =>
        getFeaturedProducts(categorySlug, productCount)
    );

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.header}>
                <h1 className={styles.headerTitle}>{title ?? data?.category.name}</h1>
                <div className={styles.headerDescription}>
                    {description ?? data?.category.description}
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