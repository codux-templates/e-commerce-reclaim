import { createBoard } from '@wixc3/react-board';
import { Toast } from '~/src/components/toast/toast/toast';

import styles from './toast.board.module.scss';

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
                        pauseDuration: 0,
                        ariaProps: {
                            role: 'status',
                            'aria-live': 'polite',
                        },
                        className: styles.noAnimation,
                        createdAt: Date.now(),
                        visible: true,
                    }}
                />
                <Toast
                    toastData={{
                        type: 'error',
                        id: '2',
                        message: 'Failed to update the item quantity',
                        pauseDuration: 0,
                        ariaProps: {
                            role: 'status',
                            'aria-live': 'polite',
                        },
                        className: styles.noAnimation,
                        createdAt: Date.now(),
                        visible: true,
                    }}
                />
                <Toast
                    toastData={{
                        type: 'blank',
                        id: '3',
                        message:
                            'Payments on the website will be unavailable for maintenance from 00:00 to 06:00 on Tuesday, April 25, 2035',
                        pauseDuration: 0,
                        ariaProps: {
                            role: 'status',
                            'aria-live': 'polite',
                        },
                        className: styles.noAnimation,
                        createdAt: Date.now(),
                        visible: true,
                    }}
                />
                <Toast
                    toastData={{
                        type: 'loading',
                        id: '4',
                        message: 'Loading...',
                        pauseDuration: 0,
                        ariaProps: {
                            role: 'status',
                            'aria-live': 'polite',
                        },
                        className: styles.noAnimation,
                        createdAt: Date.now(),
                        visible: true,
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
