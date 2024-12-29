import { NavigationMenu } from './navigation-menu/navigation-menu';
import { MenuLink } from './menu-link/menu-link';
import { MenuSection } from './menu-section/menu-section';
import { MenuItem } from './menu-item/menu-item';
import styles from './new-component-4.module.css';

interface MenuProps {
    className?: string;
}

export const Menu = ({ className }: MenuProps) => (
    <NavigationMenu className={className}>
        <MenuLink to="/">Home Page</MenuLink>
        <MenuSection trigger="Products">
            <MenuLink to="/products/kitchen-essentials">Kitchen Essentials</MenuLink>
            <MenuLink to="/products/bath">Bath</MenuLink>
            <MenuLink to="/products/on-the-go">On the Go</MenuLink>
        </MenuSection>

        <MenuSection trigger="Mega Menu" value="section">
            <div className={styles.megaMenuContent}>
                <div className={styles.megaMenuContentList}>
                    <MenuLink to="/products/kitchen-essentials">Kitchen Essentials</MenuLink>
                    <MenuLink to="/linked-page">Second Menu Link</MenuLink>
                    <MenuLink to="/linked-page">Third Menu Link</MenuLink>
                </div>
                <div className={styles.megaMenuContentList}>
                    <MenuLink to="/linked-page">Fourth Menu Link</MenuLink>
                    <MenuLink to="/linked-page">Fifth Menu Link</MenuLink>
                    <MenuLink to="/linked-page">Sixth Menu Link</MenuLink>
                </div>
            </div>
        </MenuSection>

        <MenuLink to="https://codux.com/">External Link</MenuLink>

        <MenuItem>
            <button className={styles.customButton} onClick={() => alert('Clicked')}>
                Custom Element
            </button>
        </MenuItem>
    </NavigationMenu>
);
