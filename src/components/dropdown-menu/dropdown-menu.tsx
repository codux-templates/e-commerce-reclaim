import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';

import styles from './dropdown-menu.module.scss';

export interface DropdownMenuProps extends React.PropsWithChildren {
    trigger: React.ReactNode;
    contentProps?: RadixDropdownMenu.DropdownMenuContentProps & React.RefAttributes<HTMLDivElement>;
}

export const DropdownMenu = ({ trigger, children, contentProps }: DropdownMenuProps) => (
    <RadixDropdownMenu.Root>
        <RadixDropdownMenu.Trigger asChild className={styles.trigger}>
            {trigger}
        </RadixDropdownMenu.Trigger>

        <RadixDropdownMenu.Portal>
            <RadixDropdownMenu.Content
                {...contentProps}
                className={classNames(styles.content, contentProps?.className)}
            >
                {children}
            </RadixDropdownMenu.Content>
        </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
);

export type DropdownMenuItemProps = RadixDropdownMenu.DropdownMenuItemProps &
    React.RefAttributes<HTMLDivElement>;

export const DropdownMenuItem = ({
    children,
    className,
    disabled,
    ...restProps
}: DropdownMenuItemProps) => {
    return (
        <RadixDropdownMenu.Item
            className={classNames(styles.item, className)}
            disabled={disabled}
            {...restProps}
        >
            {children}
        </RadixDropdownMenu.Item>
    );
};

export type DropdownMenuSeparatorProps = RadixDropdownMenu.DropdownMenuSeparatorProps &
    React.RefAttributes<HTMLDivElement>;

export const DropdownMenuSeparator = ({ className, ...restProps }: DropdownMenuSeparatorProps) => {
    return (
        <RadixDropdownMenu.Separator
            className={classNames(styles.separator, className)}
            {...restProps}
        />
    );
};
