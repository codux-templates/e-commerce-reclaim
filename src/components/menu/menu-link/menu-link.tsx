import React, { useContext } from 'react';
import { Item, Link, type NavigationMenuItemProps } from '@radix-ui/react-navigation-menu';
import { NavLink, useLocation } from '@remix-run/react';
import styles from './menu-link.module.css';
import classNames from 'classnames';
import { CloseSideBarMenuContext } from '../navigation-menu/navigation-menu';

interface MenuLinkProps extends NavigationMenuItemProps, React.RefAttributes<HTMLAnchorElement> {
    /** @format link */
    to?: string;
}

export const MenuLink: React.FC<MenuLinkProps> = ({ children, to = '/' }) => {
    const location = useLocation();
    const isSelected = location.pathname === to;
    const closeDialog = useContext(CloseSideBarMenuContext);

    return (
        <Item asChild className={styles.root}>
            <Link asChild>
                <NavLink
                    to={to}
                    className={classNames(isSelected && styles.selected)}
                    onClick={closeDialog}
                >
                    {children}
                </NavLink>
            </Link>
        </Item>
    );
};
