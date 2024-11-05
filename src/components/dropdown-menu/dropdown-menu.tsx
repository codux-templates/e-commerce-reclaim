import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import classNames from 'classnames';
import React from 'react';

import styles from './dropdown-menu.module.scss';

export interface DropdownMenuProps extends React.PropsWithChildren {
    trigger: React.ReactElement;
    contentProps?: RadixDropdownMenu.DropdownMenuContentProps & React.RefAttributes<HTMLDivElement>;
}

export const DropdownMenu = ({ trigger, children, contentProps = {} }: DropdownMenuProps) => (
    <RadixDropdownMenu.Root>
        <RadixDropdownMenu.Trigger asChild className={styles.trigger}>
            {trigger}
        </RadixDropdownMenu.Trigger>

        <RadixDropdownMenu.Portal>
            <RadixDropdownMenu.Content
                // Avoid Chrome adding :focus-visible outline to the trigger on close.
                onCloseAutoFocus={(e) => e.preventDefault()}
                {...{ collisionPadding: 20, ...contentProps }}
                className={classNames(styles.content, contentProps.className)}
            >
                {children}
            </RadixDropdownMenu.Content>
        </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
);

export type DropdownMenuItemProps = RadixDropdownMenu.DropdownMenuItemProps &
    React.RefAttributes<HTMLDivElement>;

export const DropdownMenuItem = React.forwardRef<HTMLDivElement>(
    ({ className, ...restProps }: DropdownMenuItemProps, forwardedRef) => (
        <RadixDropdownMenu.Item
            ref={forwardedRef}
            className={classNames(styles.item, className)}
            {...restProps}
        />
    ),
);
DropdownMenuItem.displayName = 'DropdownMenuItem';

export type DropdownMenuSeparatorProps = RadixDropdownMenu.DropdownMenuSeparatorProps &
    React.RefAttributes<HTMLDivElement>;

export const DropdownMenuSeparator = React.forwardRef<HTMLDivElement>(
    ({ className, ...restProps }: DropdownMenuSeparatorProps, forwardedRef) => {
        return (
            <RadixDropdownMenu.Separator
                ref={forwardedRef}
                className={classNames(styles.separator, className)}
                {...restProps}
            />
        );
    },
);
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';
