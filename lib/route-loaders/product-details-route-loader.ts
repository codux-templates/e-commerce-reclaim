import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/react';
import { getEcomApi } from 'lib/api/ecom-api';
import { removeQueryStringFromUrl } from 'lib/utils';

export async function productDetailsRouteLoader({ params, request }: LoaderFunctionArgs) {
    const productSlug = params.productSlug;
    if (!productSlug) throw new Error('Missing product slug');

    const productResponse = await getEcomApi().getProductBySlug(productSlug);
    if (productResponse.status === 'failure') throw json(productResponse.error);

    return {
        product: productResponse.body,
        canonicalUrl: removeQueryStringFromUrl(request.url),
    };
}
