import React from 'react';
import styles from './menu-item.module.css';
import classNames from 'classnames';
import { Item, NavigationMenuItemProps } from '@radix-ui/react-navigation-menu';

export const MenuItem: React.FC<NavigationMenuItemProps> = ({ className, children, ...props }) => (
    <Item {...props} className={classNames(styles.root, className)}>
        {children}
    </Item>
);
