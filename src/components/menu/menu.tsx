import { NavigationMenu } from './navigation-menu/navigation-menu';
import { MenuLink } from './menu-link/menu-link';

interface MenuProps {
    className?: string;
}

export const Menu = ({ className }: MenuProps) => (
    <NavigationMenu className={className}>
        <MenuLink to="/products/all-products">Shop All</MenuLink>
        <MenuLink to="/products/kitchen-essentials">Kitchen</MenuLink>
        <MenuLink to="/products/bath">Bath</MenuLink>
        <MenuLink to="/products/on-the-go">On the Go</MenuLink>
        <MenuLink to="/about-us">About Us</MenuLink>
    </NavigationMenu>
);
