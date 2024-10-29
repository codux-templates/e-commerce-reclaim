import { toast, Toaster as ReactHotToaster, resolveValue } from 'react-hot-toast';
import classNames from 'classnames';
import { CloseIcon } from '../icons';

import styles from './toaster.module.scss';
import { Toast } from './toast/toast';

export function Toaster() {
    return (
        <ReactHotToaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
                // Define default options
                className: '',
                duration: 5000,
                style: {
                    background: '#363636',
                    color: '#fff',
                },

                // Default options for specific types
                success: {
                    duration: 2000,
                },
                error: {
                    duration: 4000,
                },
                blank: {
                    duration: 4000,
                },
            }}
        >
            {(t) => <Toast toastData={t} />}
        </ReactHotToaster>
    );
}
