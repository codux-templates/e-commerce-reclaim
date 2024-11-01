import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';

import styles from './dropdown-menu.module.scss';

export interface DropdownMenuProps extends React.PropsWithChildren {
    trigger: React.ReactNode;
}

export const DropdownMenu = ({ trigger, children }: DropdownMenuProps) => (
    <RadixDropdownMenu.Root>
        <RadixDropdownMenu.Trigger asChild className={styles.trigger}>
            {trigger}
        </RadixDropdownMenu.Trigger>

        <RadixDropdownMenu.Portal>
            <RadixDropdownMenu.Content
                sideOffset={3}
                align={'end'}
                alignOffset={-5}
                className={styles.content}
            >
                {children}
            </RadixDropdownMenu.Content>
        </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
);

export interface DropdownMenuItemProps extends React.PropsWithChildren {
    className?: string;
    onClick: () => void;
}

export const DropdownMenuItem = ({ children, className, onClick }: DropdownMenuItemProps) => {
    return (
        <RadixDropdownMenu.Item className={classNames(styles.item, className)} onClick={onClick}>
            {children}
        </RadixDropdownMenu.Item>
    );
};
