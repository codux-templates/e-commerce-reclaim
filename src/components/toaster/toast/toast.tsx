import * as RadixToast from '@radix-ui/react-toast';
import classNames from 'classnames';
import { CloseIcon } from '../../icons';

import styles from './toast.module.scss';

const toastTypes = ['info', 'success', 'warning', 'error'];

interface ToastProps {
    children: React.ReactNode;
    type: string;
    isOpen: boolean;
    className?: string;
    onOpenChange: (isOpen: boolean) => void;
    onClose: () => void;
}

export const Toast = (props: ToastProps) => {
    const { children, type, isOpen, className, onOpenChange, onClose } = props;

    const typeStyle = toastTypes.includes(type) ? styles[type] : undefined;
    return (
        <RadixToast.Root
            className={classNames(styles.root, typeStyle, className)}
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
