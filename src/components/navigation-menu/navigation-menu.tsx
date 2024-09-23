import classNames from 'classnames';
import { NavLink } from '@remix-run/react';
import { ROUTES } from '~/router/config';
import { CategoryLink } from '../category-link/category-link';
import styles from './navigation-menu.module.scss';

interface NavigationMenuProps {
    className?: string;
    vertical?: boolean;
    onLinkClick?: () => void;
}

export const NavigationMenu = ({
    className,
    vertical = false,
    onLinkClick,
}: NavigationMenuProps) => {
    const menuItemStyle = ({ isActive }: { isActive: boolean }) =>
        classNames(styles.menuItem, {
            [styles.active]: isActive,
        });

    return (
        <nav className={className}>
            <ul className={classNames(styles.menuList, { [styles.vertical]: vertical })}>
                <li>
                    <CategoryLink
                        categorySlug="all-products"
                        className={menuItemStyle}
                        onClick={onLinkClick}
                    >
                        Shop All
                    </CategoryLink>
                </li>
                <li>
                    <CategoryLink
                        categorySlug="kitchen-essentials"
                        className={menuItemStyle}
                        onClick={onLinkClick}
                    >
                        Kitchen
                    </CategoryLink>
                </li>
                <li>
                    <CategoryLink
                        categorySlug="bath"
                        className={menuItemStyle}
                        onClick={onLinkClick}
                    >
                        Bath
                    </CategoryLink>
                </li>
                <li>
                    <CategoryLink
                        categorySlug="on-the-go"
                        className={menuItemStyle}
                        onClick={onLinkClick}
                    >
                        On the Go
                    </CategoryLink>
                </li>
                <li>
                    <NavLink
                        to={ROUTES.aboutUs.to()}
                        className={menuItemStyle}
                        onClick={onLinkClick}
                    >
                        About Us
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};
