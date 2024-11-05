import { createBoard } from '@wixc3/react-board';
import { Avatar } from '~/src/components/avatar/avatar';

import styles from './avatar.board.module.scss';

const catImage = `data:image/webp;base64,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`;

export default createBoard({
    name: 'Avatar',
    Board: () => {
        return (
            <div className={styles.container}>
                <Avatar imageSrc={undefined} altText="unknown user avatar" />

                <Avatar imageSrc={catImage} altText="Codux" />
            </div>
        );
    },
    environmentProps: {
        windowWidth: 400,
        windowHeight: 100,
    },
});
