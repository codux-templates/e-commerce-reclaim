import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import { commitSession, getSession, initializeEcomApi } from '~/lib/ecom/session';

export async function loader({ request }: LoaderFunctionArgs) {
    const api = await initializeEcomApi(request);

    const session = await getSession(request.headers.get('Cookie'));
    const oAuthData = session.get('oAuthData');

    const tokens = await api.handleLoginCallback(request.url, oAuthData);

    if (tokens) {
        session.set('wixEcomTokens', tokens);
    }

    return redirect('/', {
        headers: {
            'Set-Cookie': await commitSession(session),
        },
    });
}
