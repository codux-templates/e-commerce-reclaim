import { createCookieSessionStorage } from '@remix-run/node';
import { Tokens } from '@wix/sdk';
import { createApi, createWixClient, getWixClientId } from './api';

export type SessionData = {
    wixEcomTokens: Tokens;
    wixClientId: string;
};

const { getSession, commitSession } = createCookieSessionStorage<SessionData, void>({
    cookie: {
        name: '__session',
        maxAge: 3600 * 24 * 30 * 3, // 3 months
        secure: true,
        httpOnly: true,
        sameSite: 'lax',

        secrets: [process.env.SESSION_COOKIE_SIGNING_SECRET ?? 's3cret1'],
    },
});

export { commitSession };

export async function initializeSession(request: Request) {
    const session = await getSession(request.headers.get('Cookie'));

    const sessionWixClientId = session.get('wixClientId');
    const wixClientId = getWixClientId();

    // reset token if wix client id has changed
    let wixEcomTokens =
        sessionWixClientId === wixClientId ? session.get('wixEcomTokens') : undefined;
    let shouldUpdateSessionCookie = false;

    const client = createWixClient(wixEcomTokens);
    if (wixEcomTokens === undefined) {
        shouldUpdateSessionCookie = true;
        wixEcomTokens = await client.auth.generateVisitorTokens();
        session.set('wixEcomTokens', wixEcomTokens);
        session.set('wixClientId', wixClientId);
    }

    return { wixEcomTokens, session, shouldUpdateSessionCookie };
}

export async function initializeApi(request: Request) {
    const { session } = await initializeSession(request);
    const tokens = session.get('wixEcomTokens');
    const client = createWixClient(tokens);
    return createApi(client);
}
