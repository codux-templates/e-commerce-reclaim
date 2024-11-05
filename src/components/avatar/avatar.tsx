import { UserIcon } from '../icons';

import styles from './avatar.module.scss';

export interface AvatarProps {
    imageSrc: string | undefined;
}

export const Avatar = ({ imageSrc }: AvatarProps) => {
    return (
        <div className={styles.root}>
            {imageSrc ? <img src={imageSrc} alt="" /> : <UserIcon className={styles.userIcon} />}
        </div>
    );
};
