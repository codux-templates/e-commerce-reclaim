import React, { createContext, useState } from 'react';
import * as RadixNavigationMenu from '@radix-ui/react-navigation-menu';
import {
    Trigger,
    Root as DialogRoot,
    Content,
    Close,
    Portal,
    Overlay,
} from '@radix-ui/react-dialog';
import styles from './navigation-menu.module.css';
import classNames from 'classnames';
import { List, Root } from '@radix-ui/react-navigation-menu';
import { CrossIcon, MenuIcon } from '../../icons';

type RadixNavigationMenuProps = RadixNavigationMenu.NavigationMenuProps;

interface NavigationMenuProps
    extends Omit<RadixNavigationMenuProps, 'orientation' | 'aria-orientation'>,
        React.RefAttributes<HTMLDivElement> {}

export const CloseSideBarMenuContext = createContext<() => void>(() => {});

export const NavigationMenu = React.forwardRef<
    React.ElementRef<typeof RadixNavigationMenu.Root>,
    NavigationMenuProps
>(({ className, children, ...props }, forwardedRef) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div className={classNames(styles.root, className)}>
            <nav className={styles.desktopMenu}>
                <Root {...props} ref={forwardedRef}>
                    <List className={styles.menuList}>{children}</List>
                </Root>
            </nav>
            <nav className={styles.mobileMenu}>
                <DialogRoot open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <Trigger asChild>
                        <button className={styles.iconButton} aria-label="Open Menu">
                            <MenuIcon width={24} className={styles.menuIcon} />
                        </button>
                    </Trigger>
                    <Portal>
                        <Overlay className={styles.dialogOverlay} />
                        <Content className={styles.dialogContent}>
                            <Close asChild>
                                <button
                                    className={classNames(styles.iconButton, styles.closeButton)}
                                    aria-label="Close"
                                >
                                    <CrossIcon width={30} className={styles.closeIcon} />
                                </button>
                            </Close>
                            <Root>
                                <List className={styles.menuList}>
                                    <CloseSideBarMenuContext.Provider
                                        value={() => setIsDialogOpen(false)}
                                    >
                                        {children}
                                    </CloseSideBarMenuContext.Provider>
                                </List>
                            </Root>
                        </Content>
                    </Portal>
                </DialogRoot>
            </nav>
        </div>
    );
});

NavigationMenu.displayName = 'NavigationMenu';
