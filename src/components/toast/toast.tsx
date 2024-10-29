import classNames from 'classnames';
import { CloseIcon } from '../icons';
import { toast, Toast as ReactHotToastType, resolveValue } from 'react-hot-toast';

import styles from './toast.module.scss';

interface ToastProps {
    toastData: ReactHotToastType;
    style?: React.CSSProperties;
    className?: string;
}

export const Toast = ({ toastData, style, className }: ToastProps) => {
    const defaultAnimation = toastData.visible ? styles.defaultEnter : styles.defaultExit;

    return (
        <div
            className={classNames(
                styles.root,
                styles[toastData.type],
                className,
                toastData.className,
                defaultAnimation,
            )}
            style={{
                ...style,
                ...toastData.style,
            }}
        >
            <div className={styles.description}>{resolveValue(toastData.message, toastData)}</div>
            <div className={styles.close}>
                {toastData.type !== 'loading' && (
                    <CloseIcon
                        width={24}
                        className={styles.closeIcon}
                        onClick={() => toast.dismiss(toastData.id)}
                    />
                )}
            </div>
        </div>
    );
};
