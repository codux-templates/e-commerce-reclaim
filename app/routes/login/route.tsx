import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { commitSession, getSession, initializeEcomApiForRequest } from '~/lib/ecom/session';

export async function loader({ request }: LoaderFunctionArgs) {
    const currentUrl = new URL(request.url);
    const returnUrlPath = currentUrl.searchParams.get('returnPath') ?? '/';

    const loginCallbackUrl = `${currentUrl.origin}/login-callback`;
    const returnUrl = `${currentUrl.origin}${returnUrlPath}`;

    const api = await initializeEcomApiForRequest(request);
    const { oAuthData, authUrl } = await api.login(loginCallbackUrl, returnUrl);

    const session = await getSession(request.headers.get('Cookie'));

    session.flash('oAuthData', oAuthData);

    return redirect(authUrl, {
        headers: {
            'Set-Cookie': await commitSession(session),
        },
    });
}
