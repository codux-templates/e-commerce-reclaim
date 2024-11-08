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
                    title="Dialog Title"
                    description="Dialog description"
                    open={open}
                    onOpenChange={(open) => setOpen(open)}
                >
                    <div className={styles.dialogContent}>
                        <button className="button secondaryButton" onClick={() => setOpen(false)}>
                            Close Dialog
                        </button>
                        <button className="button primaryButton" onClick={() => setOpen(true)}>
                            Primary Action
                        </button>
                    </div>
                </Dialog>
            </div>
        );
    },
    environmentProps: {
        windowWidth: 736,
        windowHeight: 528,
    },
});
