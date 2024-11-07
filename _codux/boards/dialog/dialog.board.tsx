import { createBoard } from '@wixc3/react-board';
import { Dialog } from '~/src/components/dialog/dialog';

import styles from './dialog.board.module.scss';

export default createBoard({
    name: 'Dialog',
    Board: () => {
        return (
            <div className={styles.container}>
                <Dialog
                    trigger={<button className="button primaryButton">Open Dialog</button>}
                    title="Discard changes?"
                    description="Any changes you made will be lost."
                >
                    <div className={styles.buttonsContainer}>
                        <button className="button secondaryButton">Keep Editing</button>
                        <button className="button primaryButton">Discard Changes</button>
                    </div>
                </Dialog>
            </div>
        );
    },
    environmentProps: {
        windowWidth: 814,
        windowHeight: 528,
    },
});
