import { createBoard } from '@wixc3/react-board';
import toast, { Toaster } from 'react-hot-toast';
import { Toast } from '~/src/components/toast/toast';
import classNames from 'classnames';

import styles from './toast.board.module.scss';

export default createBoard({
    name: 'Toasts positions',
    Board: () => {
        const handleTopToast = () => {
            toast('Toast notification at the top of the page', {
                position: 'top-center',
            });
        };

        const handleBottomToast = () => {
            toast('Toast at the bottom right', {
                position: 'bottom-right',
                className: styles.customToast,
            });
        };

        return (
            <div className={classNames(styles.container, styles.buttons)}>
                <button className="button" onClick={handleTopToast}>
                    Open toast at the top center
                </button>
                <button className="button" onClick={handleBottomToast}>
                    Open toast at the right bottom
                </button>

                <Toaster
                    containerStyle={{
                        inset: '0',
                    }}
                    containerClassName={styles.toaster}
                >
                    {(t) => <Toast toastData={t} />}
                </Toaster>
            </div>
        );
    },
    environmentProps: {
        windowHeight: 350,
        windowWidth: 1100,
    },
});
