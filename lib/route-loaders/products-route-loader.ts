import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/react';
import { getEcomApi } from 'lib/api/ecom-api';
import { productFiltersFromSearchParams } from 'lib/api/product-filters';
import { productSortByFromSearchParams } from 'lib/api/product-sorting';

export async function productsRouteLoader({ params, request }: LoaderFunctionArgs) {
    const categorySlug = params.categorySlug;
    if (!categorySlug) {
        throw new Error('Missing category slug');
    }

    const api = getEcomApi();
    const url = new URL(request.url);

    const [
        currentCategoryResponse,
        categoryProductsResponse,
        allCategoriesResponse,
        productPriceBoundsResponse,
    ] = await Promise.all([
        api.getCategoryBySlug(categorySlug),
        api.getProductsByCategory(categorySlug, {
            filters: productFiltersFromSearchParams(url.searchParams),
            sortBy: productSortByFromSearchParams(url.searchParams),
        }),
        api.getAllCategories(),
        api.getProductPriceBounds(categorySlug),
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
    if (productPriceBoundsResponse.status === 'failure') {
        throw json(productPriceBoundsResponse.error);
    }

    return {
        category: currentCategoryResponse.body,
        categoryProducts: categoryProductsResponse.body,
        allCategories: allCategoriesResponse.body,
        productPriceBounds: productPriceBoundsResponse.body,
    };
}
