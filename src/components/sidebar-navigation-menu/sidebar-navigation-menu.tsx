import { Drawer } from '../drawer/drawer';
import { CloseIcon } from '../icons';
import { NavigationMenu } from '../navigation-menu/navigation-menu';
import styles from './sidebar-navigation-menu.module.scss';

interface SidebarNavigationMenuProps {
    open: boolean;
    onClose: () => void;
}

export const SidebarNavigationMenu = ({ open, onClose }: SidebarNavigationMenuProps) => {
    return (
        <Drawer open={open} onClose={onClose} drawerClassName={styles.drawer}>
            <NavigationMenu vertical className={styles.menu} onLinkClick={onClose} />
            <button className={styles.closeButton} onClick={onClose}>
                <CloseIcon />
            </button>
        </Drawer>
    );
};
