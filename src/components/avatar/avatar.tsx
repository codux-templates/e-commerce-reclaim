import { DefaultAvatar } from '../icons';

import styles from './avatar.module.scss';

export interface AvatarProps {
    imageSrc: string | undefined;
    altText: string;
}

export const Avatar = ({ imageSrc, altText }: AvatarProps) => {
    return (
        <div className={styles.root}>
            {imageSrc ? (
                <img alt={altText} src={imageSrc}></img>
            ) : (
                <DefaultAvatar className={styles.defaultAvatar} />
            )}
        </div>
    );
};
