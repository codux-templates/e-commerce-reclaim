import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { destroySession, getSession, initializeEcomApi } from '~/lib/ecom/session';

export async function loader({ request }: LoaderFunctionArgs) {
    const session = await getSession(request.headers.get('Cookie'));

    const api = await initializeEcomApi(request);
    const currentUrl = new URL(request.url);
    const { logoutUrl } = await api.logout(currentUrl.origin);

    return redirect(logoutUrl, {
        headers: {
            'Set-Cookie': await destroySession(session),
        },
    });
}
