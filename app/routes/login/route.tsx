import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { commitSession, getSession, initializeEcomApi } from '~/lib/ecom/session';

export async function loader({ request }: LoaderFunctionArgs) {
    const api = await initializeEcomApi(request);

    const currentUrl = new URL(request.url);
    const { oAuthData, authUrl } = await api.login(`${currentUrl.origin}/login-callback`);

    const session = await getSession(request.headers.get('Cookie'));

    session.flash('oAuthData', oAuthData);

    return redirect(authUrl, {
        headers: {
            'Set-Cookie': await commitSession(session),
        },
    });
}
