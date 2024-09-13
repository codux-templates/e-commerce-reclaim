import classNames from 'classnames';
import styles from './stretchable-link.module.scss';
import arrowIcon from '~/assets/svg/arrow.svg';

interface StretchableLinkProps {
    className?: string;
    children?: React.ReactNode;
}

export const StretchableLink = ({ children, className }: StretchableLinkProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            {children}
            <img className={styles.arrowIcon} src={arrowIcon} alt="Arrow to the right" />
        </div>
    );
};
