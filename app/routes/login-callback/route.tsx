import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { commitSession, getSession, initializeEcomApiForRequest } from '~/lib/ecom/session';

export async function loader({ request }: LoaderFunctionArgs) {
    const session = await getSession(request.headers.get('Cookie'));
    const oAuthData = session.get('oAuthData');

    const api = await initializeEcomApiForRequest(request);
    const { memberTokens, returnUrl } = await api.handleLoginCallback(request.url, oAuthData);
    if (memberTokens) {
        session.set('wixEcomTokens', memberTokens);
    }

    const redirectUrl = new URL(returnUrl);
    // add some query string to redirect url, because netlify in production mode
    // keeps query string even if it is not present in redirect location
    // and this results in `code` and `state` params presence in URL after login
    redirectUrl.searchParams.set('logged-in', 'true');

    return redirect(redirectUrl.toString(), {
        headers: {
            'Set-Cookie': await commitSession(session),
        },
    });
}
