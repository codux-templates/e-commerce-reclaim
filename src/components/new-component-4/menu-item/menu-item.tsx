import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import styles from './menu-item.module.css';
import classNames from 'classnames';
import { Item, NavigationMenuItemProps } from '@radix-ui/react-navigation-menu';

interface MenuItemProps extends NavigationMenuItemProps, React.RefAttributes<HTMLLIElement> {}

export const MenuItem = React.forwardRef<
    React.ElementRef<typeof NavigationMenu.Item>,
    MenuItemProps
>(({ className, children, ...props }, forwardedRef) => (
    <Item {...props} className={classNames(styles.root, className)} ref={forwardedRef}>
        {children}
    </Item>
));

MenuItem.displayName = 'MenuItem';
