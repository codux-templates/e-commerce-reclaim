import classNames from 'classnames';
import { CloseIcon } from '../../icons';
import { toast, Toast as ReactHotToastType, resolveValue } from 'react-hot-toast';

import styles from './toast.module.scss';

interface ToastProps {
    toastData: ReactHotToastType;
    style?: React.CSSProperties;
    className?: string;
}

export const Toast = ({ toastData, style, className }: ToastProps) => {
    const animationClassName = toastData.visible ? styles.enterAnimation : styles.exitAnimation;

    return (
        <div
            className={classNames(
                styles.root,
                styles[toastData.type],
                className,
                toastData.className,
                animationClassName,
            )}
            style={{
                ...style,
                ...toastData.style,
            }}
        >
            <div className={styles.description}>{resolveValue(toastData.message, toastData)}</div>
            {toastData.type !== 'loading' && (
                <button className={styles.closeButton} onClick={() => toast.dismiss(toastData.id)}>
                    <CloseIcon width={24} />
                </button>
            )}
        </div>
    );
};
