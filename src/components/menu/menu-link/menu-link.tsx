import React from 'react';
import { Item, Link, type NavigationMenuItemProps } from '@radix-ui/react-navigation-menu';
import { NavLink, useLocation } from '@remix-run/react';
import styles from './menu-link.module.css';
import classNames from 'classnames';

interface MenuLinkProps extends NavigationMenuItemProps, React.RefAttributes<HTMLAnchorElement> {
    /** @format link */
    to?: string;
}

export const MenuLink: React.FC<MenuLinkProps> = ({ children, to = '/' }) => {
    const location = useLocation();
    const isSelected = location.pathname === to;

    return (
        <Item asChild className={styles.root}>
            <Link asChild>
                <NavLink
                    to={to}
                    className={classNames(isSelected && styles.selected)}
                >
                    {children}
                </NavLink>
            </Link>
        </Item>
    );
};
