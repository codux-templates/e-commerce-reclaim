import { Toaster } from 'react-hot-toast';
import { Toast } from './toast/toast';
import classNames from 'classnames';

import styles from './toast-container.module.scss';

export const ToastContainer = ({ className }: { className?: string }) => {
    return (
        <Toaster
            containerStyle={{
                inset: '0',
            }}
            containerClassName={classNames(styles.container, className)}
            position="top-center"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
                style: {},
                error: {
                    style: {},
                },
                success: {
                    style: {},
                },
                loading: {
                    style: {},
                },
            }}
        >
            {(t) => <Toast toastData={t} />}
        </Toaster>
    );
};
