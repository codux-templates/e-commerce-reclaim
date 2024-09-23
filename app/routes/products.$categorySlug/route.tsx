import type { LoaderFunctionArgs } from '@remix-run/node';
import {
    isRouteErrorResponse,
    json,
    useLoaderData,
    useNavigate,
    useRouteError,
} from '@remix-run/react';
import classNames from 'classnames';
import { getEcomApi } from '~/api/ecom-api';
import { EcomApiErrorCodes } from '~/api/types';
import { Breadcrumbs } from '~/components/breadcrumbs/breadcrumbs';
import { CategoryLink } from '~/components/category-link/category-link';
import { ErrorPage } from '~/components/error-page/error-page';
import { ProductCard } from '~/components/product-card/product-card';
import { ProductLink } from '~/components/product-link/product-link';
import { FadeIn } from '~/components/visual-effects';
import { ROUTES } from '~/router/config';
import { RouteHandle } from '~/router/types';
import styles from './products.module.scss';
import { useBreadcrumbs } from '~/router/use-breadcrumbs';

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const categorySlug = params.categorySlug;
    if (!categorySlug) {
        throw new Error('Missing category slug');
    }

    const api = getEcomApi();
    const [currentCategoryResponse, categoryProductsResponse, allCategoriesResponse] =
        await Promise.all([
            api.getCategoryBySlug(categorySlug),
            api.getProductsByCategory(categorySlug),
            api.getAllCategories(),
        ]);
    if (currentCategoryResponse.status === 'failure') {
        throw json(currentCategoryResponse.error);
    }
    if (allCategoriesResponse.status === 'failure') {
        throw json(allCategoriesResponse.error);
    }
    if (categoryProductsResponse.status === 'failure') {
        throw json(categoryProductsResponse.error);
    }

    return {
        category: currentCategoryResponse.body,
        categoryProducts: categoryProductsResponse.body,
        allCategories: allCategoriesResponse.body,
    };
};

export const handle: RouteHandle<typeof loader> = {
    breadcrumbs: (match) => [
        {
            title: match.data.category.name!,
            to: ROUTES.products.to(match.data.category.slug!),
        },
    ],
};

export default function ProductsPage() {
    const { category, categoryProducts, allCategories } = useLoaderData<typeof loader>();
    const breadcrumbs = useBreadcrumbs();

    return (
        <div className={styles.page}>
            <Breadcrumbs breadcrumbs={breadcrumbs} />

            <div className={styles.content}>
                <nav className={styles.navigation}>
                    <h2 className={styles.navigationTitle}>Browse by</h2>
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
                </nav>

                <div>
                    <h1 className={styles.categoryName}>{category.name}</h1>
                    {category.description && (
                        <p className={styles.categoryDescription}>{category.description}</p>
                    )}

                    <p className={styles.productsCount}>
                        {category.numberOfProducts}{' '}
                        {category.numberOfProducts === 1 ? 'product' : 'products'}
                    </p>

                    <div className={styles.productsList}>
                        {categoryProducts.map((product) => (
                            <FadeIn key={product._id} duration={0.9}>
                                <ProductLink
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
                                        priceData={product.priceData}
                                        ribbon={product.ribbon ?? undefined}
                                    />
                                </ProductLink>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();
    const navigate = useNavigate();

    if (isRouteErrorResponse(error)) {
        let title: string;
        let message: string | undefined;
        if (error.data.code === EcomApiErrorCodes.CategoryNotFound) {
            title = 'Category Not Found';
            message = "Unfortunately, the category page you're trying to open does not exist";
        } else {
            title = 'Error';
            message = error.data.message;
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

    throw error;
}
