import * as RadixToast from '@radix-ui/react-toast';
import { Toast } from './toast/toast';
import { useToaster } from './toaster-context';

import styles from './toaster.module.scss';
import classNames from 'classnames';
import { useCartOpen } from '../cart/cart-open-context';

export function Toaster() {
    const { toast, onOpenChange, closeToast } = useToaster();
    const { isOpen: isCartOpen } = useCartOpen();

    if (!toast) return null;

    return (
        <RadixToast.Provider>
            <Toast
                type={toast.type}
                isOpen={toast.isOpen}
                location={isCartOpen ? 'cart' : undefined}
                onOpenChange={onOpenChange}
                onClose={closeToast}
            >
                {toast.message}
            </Toast>
            <RadixToast.Viewport className={classNames(styles.viewport)} />
        </RadixToast.Provider>
    );
}
