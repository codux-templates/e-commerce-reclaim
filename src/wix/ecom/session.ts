import { createCookieSessionStorage } from '@remix-run/node';
import { OauthData, Tokens } from '@wix/sdk';
import {
    createWixClient,
    getWixClientId,
    initializeEcomApiAnonymous,
    initializeEcomApiWithTokens,
} from './api';

export type SessionData = {
    wixSessionTokens: Tokens;
    wixClientId: string;
};

type FlashData = {
    oAuthData: OauthData;
};

const { getSession, commitSession, destroySession } = createCookieSessionStorage<
    SessionData,
    FlashData
>({
    cookie: {
        name: '__session',
        maxAge: 3600 * 24 * 100, // 100 days
        secure: true,
        httpOnly: true,
        sameSite: 'lax',

        secrets: [process.env.SESSION_COOKIE_SIGNING_SECRET ?? 's3cret1'],
    },
});

export { commitSession, destroySession, getSession };

export async function initializeEcomSession(request: Request) {
    const session = await getSession(request.headers.get('Cookie'));
    const sessionWixClientId = session.get('wixClientId');
    const wixClientId = getWixClientId();

    // Retrieve session tokens only if the OAuth client ID matches the one associated with the session;
    // otherwise, reset the session tokens due to client ID mismatch.
    const wixSessionTokens =
        sessionWixClientId === wixClientId ? session.get('wixSessionTokens') : undefined;

    const effectiveTokens = await getEffectiveWixAuthTokens(wixSessionTokens);

    let shouldUpdateSessionCookie = false;
    if (effectiveTokens !== wixSessionTokens) {
        shouldUpdateSessionCookie = true;
        session.set('wixSessionTokens', effectiveTokens);
    }

    if (sessionWixClientId !== wixClientId) {
        shouldUpdateSessionCookie = true;
        session.set('wixClientId', wixClientId);
    }

    return { wixSessionTokens: effectiveTokens, session, shouldUpdateSessionCookie };
}

export async function initializeEcomApiForRequest(request: Request) {
    const { wixSessionTokens } = await initializeEcomSession(request);
    return wixSessionTokens
        ? initializeEcomApiWithTokens(wixSessionTokens)
        : initializeEcomApiAnonymous();
}

async function getEffectiveWixAuthTokens(sessionTokens: Tokens | undefined) {
    const client = createWixClient(sessionTokens);

    let effectiveTokens: Tokens | undefined;

    if (sessionTokens === undefined) {
        effectiveTokens = await client.auth.generateVisitorTokens();
    } else {
        effectiveTokens = sessionTokens;

        const currentTimeStampSeconds = Date.now() / 1000;
        if (currentTimeStampSeconds > effectiveTokens.accessToken.expiresAt) {
            try {
                effectiveTokens = await client.auth.renewToken(sessionTokens.refreshToken);
            } catch {
                // generate new visitor tokens if renewing process failed
                effectiveTokens = await client.auth.generateVisitorTokens();
            }
        }
    }

    return effectiveTokens;
}
