import { useState } from 'react';
import { useEcomApi } from '~/src/wix/ecom';

export function useAccountDetailsForm(initialValue: {
    id: string | undefined | null;
    loginEmail: string | undefined | null;
    firstName: string | undefined;
    lastName: string | undefined;
    phoneNumber: string | undefined;
}) {
    const api = useEcomApi();

    const [currentValue, setCurrentValue] = useState(initialValue);

    const [firstName, setFirstName] = useState(initialValue?.firstName ?? '');
    const [lastName, setLastName] = useState(initialValue?.lastName ?? '');
    const [phone, setPhone] = useState(initialValue?.phoneNumber ?? '');

    const [isUpdating, setIsUpdating] = useState(false);
    const [isResettingPassword, setIsResettingPassword] = useState(false);

    const updateAccountDetails = async () => {
        if (!initialValue?.id) {
            return;
        }

        try {
            setIsUpdating(true);
            const updatedUser = await api.updateUser(initialValue.id, {
                contact: {
                    firstName,
                    lastName,
                    phones: [phone],
                },
            });

            setCurrentValue({
                id: updatedUser?._id,
                loginEmail: updatedUser?.loginEmail,
                firstName: updatedUser?.contact?.firstName ?? '',
                lastName: updatedUser?.contact?.lastName ?? '',
                phoneNumber: updatedUser?.contact?.phones?.[0] ?? '',
            });
        } finally {
            setIsUpdating(false);
        }
    };

    const discardChanges = () => {
        setFirstName(currentValue?.firstName ?? '');
        setLastName(currentValue?.lastName ?? '');
        setPhone(currentValue?.phoneNumber ?? '');
    };

    const sendPasswordResetEmail = async () => {
        if (!currentValue?.loginEmail) {
            return;
        }

        try {
            setIsResettingPassword(true);
            await api.sendPasswordResetEmail(currentValue.loginEmail, document.location.href);
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
