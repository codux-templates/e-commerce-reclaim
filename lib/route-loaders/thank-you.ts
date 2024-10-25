import { json } from '@remix-run/react';
import { OrderDetails } from '~/lib/ecom';
import { getEcomApi } from '~/lib/ecom/api';

export async function getThankYouRouteData(url: string): Promise<{ order?: OrderDetails }> {
    const orderId = new URL(url).searchParams.get('orderId');
    // Show "Thank you" page even without order details.
    if (!orderId) return { order: undefined };

    const api = await getEcomApi();
    const orderResponse = await api.getOrder(orderId);
    if (orderResponse.status === 'failure') throw json(orderResponse.error);

    return { order: orderResponse.body };
}
