import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';

import styles from './dropdown-menu.module.scss';

export interface DropdownMenuProps extends React.PropsWithChildren {
    trigger: React.ReactNode;
    contentClassName?: string;
}

export const DropdownMenu = ({ trigger, children, contentClassName }: DropdownMenuProps) => (
    <RadixDropdownMenu.Root>
        <RadixDropdownMenu.Trigger asChild className={styles.trigger}>
            {trigger}
        </RadixDropdownMenu.Trigger>

        <RadixDropdownMenu.Portal>
            <RadixDropdownMenu.Content
                className={classNames(styles.content, contentClassName)}
                sideOffset={3}
                align={'end'}
                alignOffset={-5}
            >
                {children}
            </RadixDropdownMenu.Content>
        </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
);

export interface DropdownMenuItemProps extends React.PropsWithChildren {
    className?: string;
    onClick?: () => void;
}

export const DropdownMenuItem = ({ children, className, onClick }: DropdownMenuItemProps) => {
    return (
        <RadixDropdownMenu.Item className={classNames(styles.item, className)} onClick={onClick}>
            {children}
        </RadixDropdownMenu.Item>
    );
};
