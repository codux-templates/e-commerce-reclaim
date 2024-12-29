import React from 'react';
import * as RadixNavigationMenu from '@radix-ui/react-navigation-menu';
import * as Dialog from '@radix-ui/react-dialog';
import { MenuIcon } from '../menu-icon/menu-icon';
import { MenuCloseIcon } from '../menu-close-icon/menu-close-icon';
import styles from './navigation-menu.module.css';
import classNames from 'classnames';
import { List, Root } from '@radix-ui/react-navigation-menu';

type RadixNavigationMenuProps = RadixNavigationMenu.NavigationMenuProps;

interface NavigationMenuProps
    extends RadixNavigationMenuProps,
        React.RefAttributes<HTMLLIElement> {}

export const NavigationMenu = React.forwardRef<
    React.ElementRef<typeof RadixNavigationMenu.Root>,
    NavigationMenuProps
>(({ className, children, ...props }, forwardedRef) => (
    <div className={classNames(styles.root, className)}>
        <nav className={styles.desktopMenu}>
            <Root {...props} ref={forwardedRef}>
                <List className={styles.menuList}>{children}</List>
            </Root>
        </nav>
        <nav className={styles.mobileMenu}>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <button className={styles.iconButton} aria-label="Menu">
                        <MenuIcon />
                    </button>
                </Dialog.Trigger>
                <Dialog.Content className={styles.dialogContent}>
                    <Dialog.Close asChild>
                        <button
                            className={classNames(styles.iconButton, styles.closeButton)}
                            aria-label="Close"
                        >
                            <MenuCloseIcon />
                        </button>
                    </Dialog.Close>
                    <Root>
                        <List className={styles.menuList}>{children}</List>
                    </Root>
                </Dialog.Content>
            </Dialog.Root>
        </nav>
    </div>
));

NavigationMenu.displayName = 'NavigationMenu';
