import type { SerializeFrom } from '@remix-run/node';
import { useState } from 'react';
import { Member, useEcomApi } from '../ecom';

export function useAccountDetailsForm(loadedUser: Member | SerializeFrom<Member> | undefined) {
    const api = useEcomApi();

    const [user, setUser] = useState(loadedUser);

    const [firstName, setFirstName] = useState(loadedUser?.contact?.firstName ?? '');
    const [lastName, setLastName] = useState(loadedUser?.contact?.lastName ?? '');
    const [phone, setPhone] = useState(loadedUser?.contact?.phones?.[0] ?? '');

    const [isUpdating, setIsUpdating] = useState(false);
    const [isResettingPassword, setIsResettingPassword] = useState(false);

    const updateAccountDetails = async () => {
        if (!user?._id) {
            return;
        }

        try {
            setIsUpdating(true);
            const updatedUser = await api.updateUser(user._id, {
                contact: {
                    firstName,
                    lastName,
                    phones: [phone],
                },
            });

            setUser(updatedUser);
        } finally {
            setIsUpdating(false);
        }
    };

    const discardChanges = () => {
        setFirstName(user?.contact?.firstName ?? '');
        setLastName(user?.contact?.lastName ?? '');
        setPhone(user?.contact?.phones?.[0] ?? '');
    };

    const sendPasswordResetEmail = async () => {
        if (!user?.loginEmail) {
            return;
        }

        try {
            setIsResettingPassword(true);
            await api.sendPasswordResetEmail(user.loginEmail, document.location.href);
        } finally {
            setIsResettingPassword(false);
        }
    };

    return {
        firstName,
        setFirstName,
        lastName,
        setLastName,
        phone,
        setPhone,
        isUpdating,
        isResettingPassword,
        updateAccountDetails,
        discardChanges,
        sendPasswordResetEmail,
    };
}
