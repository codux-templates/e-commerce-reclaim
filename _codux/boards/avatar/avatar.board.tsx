import { createBoard } from '@wixc3/react-board';
import { Avatar } from '~/src/components/avatar/avatar';
import { catImage } from './cat-image';

import styles from './avatar.board.module.scss';

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
