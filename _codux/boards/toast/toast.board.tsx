import { createBoard } from '@wixc3/react-board';
import * as RadixToast from '@radix-ui/react-toast';
import { Toast } from '~/components/toaster/toast/toast';
import { ToastType } from '~/components/toaster/toaster-context';
import styles from './toast.board.module.scss';

const noop = () => {};

export default createBoard({
    name: 'Toasts',
    Board: () => {
        return (
            <RadixToast.Provider>
                <Toast
                    type={ToastType.Success}
                    isOpen={true}
                    onOpenChange={noop}
                    onClose={noop}
                    className={styles.toast}
                >
                    The product is added to the cart
                </Toast>

                <Toast
                    type={ToastType.Error}
                    isOpen={true}
                    onOpenChange={noop}
                    onClose={noop}
                    className={styles.toast}
                >
                    Failed to update the item quantity
                </Toast>

                <Toast
                    type={ToastType.Warning}
                    isOpen={true}
                    onOpenChange={noop}
                    onClose={noop}
                    className={styles.toast}
                >
                    Some items in your cart may incur additional taxes during shipping to your
                    country
                </Toast>

                <Toast
                    type={ToastType.Info}
                    isOpen={true}
                    onOpenChange={noop}
                    onClose={noop}
                    className={styles.toast}
                >
                    Payments on the website will be unavailable for maintenance from 00:00 to 06:00
                    on Tuesday, April 25, 2035.
                </Toast>

                <RadixToast.Viewport className={styles.viewport} />
            </RadixToast.Provider>
        );
    },
    environmentProps: {
        windowWidth: 510,
        windowHeight: 314,
    },
});
