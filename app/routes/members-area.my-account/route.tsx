import { LoaderFunctionArgs, redirect } from '@remix-run/node';
import type { MetaFunction } from '@remix-run/react';
import { useLoaderData } from '@remix-run/react';
import classNames from 'classnames';
import { useState } from 'react';
import { useEcomApi } from '~/lib/ecom';
import { initializeEcomApiForRequest } from '~/lib/ecom/session';

import styles from './route.module.scss';
import { Spinner } from '~/src/components/spinner/spinner';
import { Dialog, DialogDescription, DialogTitle } from '~/src/components/dialog/dialog';

export async function loader({ request }: LoaderFunctionArgs) {
    const api = await initializeEcomApiForRequest(request);
    if (!api.isLoggedIn()) {
        return redirect('/login');
    }

    const user = await api.getUser();
    return { user };
}

export default function MyAccountPage() {
    const { user } = useLoaderData<typeof loader>();

    const originalFirstName = user?.contact?.firstName ?? '';
    const originalLastName = user?.contact?.lastName ?? '';
    const originalPhone = user?.contact?.phones?.[0] ?? '';

    const [firstName, setFirstName] = useState(originalFirstName);
    const [lastName, setLastName] = useState(originalLastName);
    const [phone, setPhone] = useState(originalPhone);

    const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isResettingPassword, setIsResettingPassword] = useState(false);

    const onDiscardClick = () => {
        setDiscardConfirmationOpen(true);
    };

    const discardChanges = () => {
        setFirstName(originalFirstName);
        setLastName(originalLastName);
        setPhone(originalPhone);

        setDiscardConfirmationOpen(false);
    };

    const api = useEcomApi();

    const handleUpdate = () => {
        if (!user?._id) {
            return;
        }

        setIsUpdating(true);
        api.updateUser(user._id, {
            contact: {
                firstName,
                lastName,
                phones: [phone],
            },
        }).finally(() => setIsUpdating(false));
    };

    const handleResetPassword = () => {
        if (!user?.loginEmail) {
            return;
        }

        setIsResettingPassword(true);
        api.resetPassword(user.loginEmail).finally(() => setIsResettingPassword(false));
    };

    return (
        <div className={styles.root}>
            <div className={classNames(styles.section, styles.header)}>
                <div>
                    <h2 className="heading4">Account</h2>
                    <span className="paragraph1">View and edit your personal info below.</span>
                </div>
                <div className={styles.actions}>
                    <button className="button secondaryButton smallButton" onClick={onDiscardClick}>
                        Discard
                    </button>
                    <button
                        className="button primaryButton smallButton"
                        disabled={isUpdating}
                        onClick={handleUpdate}
                    >
                        {isUpdating ? <Spinner size={22} /> : 'Update Info'}
                    </button>
                </div>
            </div>

            <div className={styles.section}>
                <div>
                    <h2 className="heading5">Personal info</h2>
                    <span className="paragraph1">Update you personal information.</span>
                </div>

                <form className={styles.form}>
                    <label>
                        First Name
                        <input
                            className="textInput"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </label>

                    <label>
                        Last Name
                        <input
                            className="textInput"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </label>

                    <label>
                        Phone
                        <input
                            className="textInput"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </label>
                </form>

                <div className={styles.actions}>
                    <button className="button secondaryButton smallButton" onClick={onDiscardClick}>
                        Discard
                    </button>
                    <button
                        className="button primaryButton smallButton"
                        disabled={isUpdating}
                        onClick={handleUpdate}
                    >
                        {isUpdating ? <Spinner size={22} /> : 'Update Info'}
                    </button>
                </div>
            </div>

            <div className={styles.section}>
                <div>
                    <h2 className="heading5">Login info</h2>
                    <span className="paragraph1">View your login email and reset password.</span>
                </div>

                <div className={styles.loginInfoSection}>
                    <div>
                        <span>Login email:</span>
                        <span>{user?.loginEmail}</span>
                    </div>

                    <div className={styles.actions}>
                        <button
                            className="button primaryButton smallButton"
                            disabled={isResettingPassword}
                            onClick={handleResetPassword}
                        >
                            {isResettingPassword ? <Spinner size={22} /> : 'Reset password'}
                        </button>
                    </div>
                </div>
            </div>

            <Dialog
                open={discardConfirmationOpen}
                onOpenChange={(open) => setDiscardConfirmationOpen(open)}
                contentProps={{
                    className: styles.confirmationDialog,
                }}
            >
                <DialogTitle className={styles.title}>Discard changes?</DialogTitle>
                <DialogDescription>Any changes you made will be lost.</DialogDescription>
                <div className={styles.body}>
                    <button
                        className="button secondaryButton smallButton"
                        onClick={() => setDiscardConfirmationOpen(false)}
                    >
                        Keep Editing
                    </button>
                    <button className="button primaryButton smallButton" onClick={discardChanges}>
                        Discard Changes
                    </button>
                </div>
            </Dialog>
        </div>
    );
}

export const meta: MetaFunction = () => {
    return [
        { title: 'My Account | ReClaim' },
        {
            name: 'description',
            content: 'Essential home products for sustainable living',
        },
        {
            property: 'robots',
            content: 'noindex, nofollow',
        },
    ];
};
