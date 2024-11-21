import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { initializeEcomApiForRequest } from '~/src/wix/ecom/session';

export async function action({ request }: ActionFunctionArgs) {
    const api = await initializeEcomApiForRequest(request);
    const formData = await request.formData();

    const userEmail = formData.get('email') as string | undefined;

    if (!userEmail) {
        throw new Error('Missing user email to send reset password email');
    }

    await api.sendPasswordResetEmail(userEmail, request.url);

    return redirect('/members-area/my-account');
}

// run in Codux define app mode only
export async function mockAction(): ReturnType<typeof action> {
    return redirect('/members-area/my-account');
}
