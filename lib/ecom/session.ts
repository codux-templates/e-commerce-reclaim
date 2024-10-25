import { createCookieSessionStorage } from '@remix-run/node';
import { Tokens } from '@wix/sdk';
import { getWixClientId, initializeEcomApi } from './api';

type SessionData = {
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

export async function initializeSession(request: Request) {
    const session = await getSession(request.headers.get('Cookie'));

    const sessionWixClientId = session.get('wixClientId');
    const wixClientId = getWixClientId();

    // reset token if wix client id has changed
    let tokens = sessionWixClientId !== wixClientId ? undefined : session.get('wixEcomTokens');

    const { client } = initializeEcomApi(tokens);

    let sessionCookie: string | undefined;
    if (tokens === undefined) {
        tokens = await client.auth.generateVisitorTokens();
        session.set('wixEcomTokens', tokens);
        session.set('wixClientId', wixClientId);
        sessionCookie = await commitSession(session);
    }

    return { session, wixEcomTokens: tokens, sessionCookie };
}
