import * as RadixToast from '@radix-ui/react-toast';
import { Toast } from './toast/toast';
import { useToast } from './toaster-context';

import styles from './toaster.module.scss';
import classNames from 'classnames';

export function Toaster() {
    const { toastData: toast, onOpenChange, closeToast } = useToast();

    if (!toast) return null;

    return (
        <RadixToast.Provider>
            <Toast
                type={toast.type}
                isOpen={toast.isOpen}
                onOpenChange={onOpenChange}
                onClose={closeToast}
            >
                {toast.message}
            </Toast>
            <RadixToast.Viewport className={classNames(styles.viewport)} />
        </RadixToast.Provider>
    );
}
