import { createBoard } from '@wixc3/react-board';
import toast, { Toaster } from 'react-hot-toast';
import { Toast } from '~/src/components/toaster/toast/toast';

import styles from './toaster.board.module.scss';

export default createBoard({
    name: 'Toaster',
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
            <div className={styles.container}>
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
