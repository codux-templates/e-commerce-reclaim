import { useEffect } from 'react';
import classNames from 'classnames';
import styles from './drawer.module.scss';

interface DrawerProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const Drawer = ({ open, onClose, children }: DrawerProps) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        if (open) document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, onClose]);

    return (
        <div className={classNames(styles.root, { [styles.open]: open })}>
            <div className={styles.overlay} onClick={onClose}></div>
            <div className={styles.drawer}>{children}</div>
        </div>
    );
};
