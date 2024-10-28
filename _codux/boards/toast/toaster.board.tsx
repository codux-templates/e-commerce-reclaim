import { createBoard } from '@wixc3/react-board';
import toast, { Toaster } from 'react-hot-toast';
import { Toast } from '~/src/components/toast/toast';

import styles from './toast.board.module.scss';
import classNames from 'classnames';

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
                style: {
                    width: '280px',
                },
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
                        inset: '50px 0 0 0',
                    }}
                >
                    {(t) => <Toast toastData={t} />}
                </Toaster>
            </div>
        );
    },
    environmentProps: {
        windowHeight: 330,
        windowWidth: 1078,
    },
});
