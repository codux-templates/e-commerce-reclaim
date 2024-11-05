import { createBoard } from '@wixc3/react-board';
import { Toast } from '~/src/components/toast/toast/toast';
import { Toast as ToastType } from 'react-hot-toast';

import styles from './toast.board.module.scss';

const commonToastProps: Pick<
    ToastType,
    'pauseDuration' | 'ariaProps' | 'className' | 'createdAt' | 'visible'
> = {
    pauseDuration: 0,
    ariaProps: {
        role: 'status',
        'aria-live': 'polite',
    },
    className: styles.noAnimation,
    createdAt: Date.now(),
    visible: true,
};

export default createBoard({
    name: 'Toasts',
    Board: () => {
        return (
            <div className={styles.container}>
                <Toast
                    toastData={{
                        type: 'success',
                        id: '1',
                        message: 'The product is added to the cart',
                        ...commonToastProps,
                    }}
                />
                <Toast
                    toastData={{
                        type: 'error',
                        id: '2',
                        message: 'Failed to update the item quantity',
                        ...commonToastProps,
                    }}
                />
                <Toast
                    toastData={{
                        type: 'blank',
                        id: '3',
                        message:
                            'Payments on the website will be unavailable for maintenance from 00:00 to 06:00 on Tuesday, April 25, 2035',
                        ...commonToastProps,
                    }}
                />
                <Toast
                    toastData={{
                        type: 'loading',
                        id: '4',
                        message: 'Loading...',
                        ...commonToastProps,
                    }}
                />
            </div>
        );
    },
    environmentProps: {
        windowWidth: 1080,
        windowHeight: 300,
    },
});
