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

    return redirect(returnUrl, {
        headers: {
            'Set-Cookie': await commitSession(session),
        },
    });
}
