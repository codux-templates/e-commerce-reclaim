import { createBoard } from '@wixc3/react-board';
import { Dialog } from '~/src/components/dialog/dialog';

import styles from './dialog.board.module.scss';
import { useState } from 'react';

export default createBoard({
    name: 'Dialog',
    Board: () => {
        const [open, setOpen] = useState(true);
        return (
            <div className={styles.container}>
                <Dialog
                    trigger={<button className="button primaryButton">Open Dialog</button>}
                    title="Discard changes?"
                    description="Any changes you made will be lost."
                    open={open}
                    onOpenChange={(open) => setOpen(open)}
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
        windowWidth: 724,
        windowHeight: 528,
    },
});
