import * as RadixToast from '@radix-ui/react-toast';
import classNames from 'classnames';
import { CloseIcon } from '../../icons';

import styles from './toast.module.scss';
import { ToastType } from '../toaster-context';

interface ToastProps {
    children: React.ReactNode;
    type: ToastType;
    isOpen: boolean;
    isCartOpen?: boolean;
    className?: string;
    onOpenChange: (isOpen: boolean) => void;
    onClose: () => void;
}

export const Toast = (props: ToastProps) => {
    const { children, type, isOpen, isCartOpen, className, onOpenChange, onClose } = props;

    return (
        <RadixToast.Root
            className={classNames(styles.root, styles[type], className, {
                [styles.inCart]: isCartOpen,
            })}
            open={isOpen}
            onOpenChange={onOpenChange}
        >
            <RadixToast.Description className={styles.description}>
                {children}
            </RadixToast.Description>
            <RadixToast.Close asChild className={styles.close}>
                <CloseIcon width={24} className={styles.closeIcon} onClick={onClose} />
            </RadixToast.Close>
        </RadixToast.Root>
    );
};
