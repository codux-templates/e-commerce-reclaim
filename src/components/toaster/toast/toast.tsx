import * as RadixToast from '@radix-ui/react-toast';
import classNames from 'classnames';
import { CloseIcon } from '../../icons';

import styles from './toast.module.scss';
import { ToastType } from '../toaster-context';

interface ToastProps {
    children: React.ReactNode;
    type: ToastType;
    isOpen: boolean;
    location?: string;
    className?: string;
    onOpenChange: (isOpen: boolean) => void;
    onClose: () => void;
}

export const Toast = (props: ToastProps) => {
    const { children, type, isOpen, location, className, onOpenChange, onClose } = props;

    return (
        <RadixToast.Root
            className={classNames(
                styles.root,
                styles[type],
                location && styles[location],
                className,
            )}
            open={isOpen}
            onOpenChange={onOpenChange}
        >
            <RadixToast.Description className={styles.description}>
                {children}
            </RadixToast.Description>
            <RadixToast.Close asChild className={styles.close}>
                <CloseIcon
                    width={24}
                    className={styles.closeIcon}
                    onClick={onClose}
                    aria-label="Close"
                />
            </RadixToast.Close>
        </RadixToast.Root>
    );
};
