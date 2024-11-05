import { createBoard } from '@wixc3/react-board';
import toast from 'react-hot-toast';
import { ToastContainer } from '~/src/components/toast/toast-container';

import styles from './toast-container.board.module.scss';

export default createBoard({
    name: 'Toast Container',
    Board: () => {
        const handleTopToast = () => {
            toast.success('Toast at the top of the page', {
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
            <div className={styles.container}>
                <button className="button" onClick={handleTopToast}>
                    Open toast at the top center
                </button>
                <button className="button" onClick={handleBottomToast}>
                    Open toast at the right bottom
                </button>

                <ToastContainer className={styles.toastContainer} />
            </div>
        );
    },
    environmentProps: {
        windowHeight: 350,
        windowWidth: 1100,
    },
});
