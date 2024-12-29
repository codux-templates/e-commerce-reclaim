import React, { useState } from 'react';
import { Item, Link, NavigationMenuLinkProps } from '@radix-ui/react-navigation-menu';
import { NavLink } from '@remix-run/react';
import styles from './menu-link.module.css';
import classNames from 'classnames';

interface MenuLinkProps extends NavigationMenuLinkProps, React.RefAttributes<HTMLAnchorElement> {
    /** @format link */
    to?: string;
}

export const MenuLink = React.forwardRef<React.ElementRef<typeof Link>, MenuLinkProps>(
    ({ className, children, to = '/', ...props }, forwardedRef) => (
        <Item asChild>
            <Link {...props} className={classNames(styles.root, className)} ref={forwardedRef}>
                <NavLink
                    className={({ isActive }) => classNames(isActive && styles.active)}
                    to={to}
                >
                    {children}
                </NavLink>
            </Link>
        </Item>
    ),
);

MenuLink.displayName = 'MenuLink';
