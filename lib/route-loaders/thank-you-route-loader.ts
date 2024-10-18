import type { LoaderFunctionArgs } from '@remix-run/node';
import { json } from '@remix-run/react';
import { getEcomApi } from 'lib/api/ecom-api';
import { OrderDetails } from 'lib/api/types';

export async function thankYouRouteLoader({
    request,
}: LoaderFunctionArgs): Promise<{ order?: OrderDetails }> {
    const orderId = new URL(request.url).searchParams.get('orderId');
    // Show "Thank you" page even without order details.
    if (!orderId) return { order: undefined };

    const orderResponse = await getEcomApi().getOrder(orderId);
    if (orderResponse.status === 'failure') throw json(orderResponse.error);

    return { order: orderResponse.body };
}
