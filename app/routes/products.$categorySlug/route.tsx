import { isRouteErrorResponse, useLoaderData, useNavigate, useRouteError } from '@remix-run/react';
import classNames from 'classnames';
import { EcomApiErrorCodes } from 'lib/api/types';
import { useAppliedProductFilters } from 'lib/hooks/use-applied-product-filters';
import { productsRouteLoader } from 'lib/route-loaders/products-route-loader';
import { FadeIn } from 'lib/components/visual-effects';
import { getErrorMessage } from 'lib/utils';
import { AppliedProductFilters } from '~/components/applied-product-filters/applied-product-filters';
import { Breadcrumbs, RouteBreadcrumbs, useBreadcrumbs } from '~/components/breadcrumbs';
import { CategoryLink } from '~/components/category-link/category-link';
import { EmptyProductsCategory } from '~/components/empty-products-category/empty-products-category';
import { ErrorPage } from '~/components/error-page/error-page';
import { ProductCard } from '~/components/product-card/product-card';
import { ProductFilters } from '~/components/product-filters/product-filters';
import { ProductLink } from '~/components/product-link/product-link';
import { ProductSortingSelect } from '~/components/product-sorting-select/product-sorting-select';
import { ROUTES } from '~/router/config';

import styles from './route.module.scss';

export const loader = productsRouteLoader;

const breadcrumbs: RouteBreadcrumbs<typeof loader> = (match) => [
    {
        title: match.data.category.name!,
        to: ROUTES.products.to(match.data.category.slug!),
    },
];

export const handle = {
    breadcrumbs,
};

export default function ProductsPage() {
    const { category, categoryProducts, allCategories, productPriceBounds } =
        useLoaderData<typeof loader>();

    const breadcrumbs = useBreadcrumbs();

    const { appliedFilters, someFiltersApplied, clearFilters, clearAllFilters } =
        useAppliedProductFilters();

    const currency = categoryProducts.items[0]?.priceData?.currency ?? 'USD';

    const renderProducts = () => {
        if (category.numberOfProducts === 0) {
            return (
                <EmptyProductsCategory
                    title="No products here yet..."
                    subtitle="In the meantime, you can choose a different category to continue shopping."
                />
            );
        }

        if (someFiltersApplied && categoryProducts.items.length === 0) {
            return (
                <EmptyProductsCategory
                    title="We couldn't find any matches"
                    subtitle="Try different filters or another category."
                    actionButton={
                        <button className={styles.clearFiltersButton} onClick={clearAllFilters}>
                            Clear Filters
                        </button>
                    }
                />
            );
        }

        return (
            <div className={styles.productsList}>
                {categoryProducts.items.map((product) => (
                    <FadeIn key={product._id} duration={0.9}>
                        <ProductLink
                            className={styles.productLink}
                            productSlug={product.slug!}
                            state={{
                                fromCategory: {
                                    name: category.name,
                                    slug: category.slug,
                                },
                            }}
                        >
                            <ProductCard
                                name={product.name!}
                                imageUrl={product.media?.mainMedia?.image?.url}
                                price={product.priceData?.formatted?.price}
                                discountedPrice={product.priceData?.formatted?.discountedPrice}
                                ribbon={product.ribbon ?? undefined}
                                inventoryStatus={product.stock?.inventoryStatus}
                            />
                        </ProductLink>
                    </FadeIn>
                ))}
            </div>
        );
    };

    return (
        <div className={styles.page}>
            <Breadcrumbs breadcrumbs={breadcrumbs} />

            <div className={styles.content}>
                <div className={styles.sidebar}>
                    <nav>
                        <h2 className={styles.sidebarTitle}>Browse by</h2>
                        <ul>
                            {allCategories.map((category) => (
                                <li key={category._id} className={styles.categoryListItem}>
                                    <CategoryLink
                                        categorySlug={category.slug!}
                                        className={({ isActive }) =>
                                            classNames(styles.categoryLink, {
                                                [styles.categoryLinkActive]: isActive,
                                            })
                                        }
                                    >
                                        {category.name}
                                    </CategoryLink>
                                </li>
                            ))}
                        </ul>

                        {category.numberOfProducts !== 0 && (
                            <div className={styles.filters}>
                                <h2
                                    className={classNames(styles.sidebarTitle, styles.filtersTitle)}
                                >
                                    Filters
                                </h2>
                                <ProductFilters
                                    lowestPrice={productPriceBounds.lowest}
                                    highestPrice={productPriceBounds.highest}
                                    currency={currency}
                                />
                            </div>
                        )}
                    </nav>
                </div>

                <div className={styles.main}>
                    <div className={styles.categoryHeader}>
                        <h1 className={styles.categoryName}>{category.name}</h1>
                        {category.description && (
                            <p className={styles.categoryDescription}>{category.description}</p>
                        )}
                    </div>

                    {someFiltersApplied && (
                        <AppliedProductFilters
                            className={styles.appliedFilters}
                            appliedFilters={appliedFilters}
                            onClearFilters={clearFilters}
                            onClearAllFilters={clearAllFilters}
                            currency={currency}
                            minPriceInCategory={productPriceBounds.lowest}
                            maxPriceInCategory={productPriceBounds.highest}
                        />
                    )}

                    <div className={styles.countAndSorting}>
                        <p className={styles.productsCount}>
                            {categoryProducts.totalCount}{' '}
                            {categoryProducts.totalCount === 1 ? 'product' : 'products'}
                        </p>

                        <ProductSortingSelect />
                    </div>

                    {renderProducts()}
                </div>
            </div>
        </div>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();
    const navigate = useNavigate();

    let title = 'Error';
    let message = getErrorMessage(error);

    if (isRouteErrorResponse(error) && error.data.code === EcomApiErrorCodes.CategoryNotFound) {
        title = 'Category Not Found';
        message = "Unfortunately, the category page you're trying to open does not exist";
    }

    return (
        <ErrorPage
            title={title}
            message={message}
            actionButtonText="Back to shopping"
            onActionButtonClick={() => navigate(ROUTES.products.to('all-products'))}
        />
    );
}
