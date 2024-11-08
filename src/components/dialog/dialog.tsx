import classNames from 'classnames';
import React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { CloseIcon } from '../icons';

import styles from './dialog.module.scss';

export interface DropdownMenuProps extends React.PropsWithChildren {
    title: string;
    description?: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    trigger: React.ReactElement;
}

export const Dialog = ({
    trigger,
    title,
    description,
    open,
    onOpenChange,
    children,
}: DropdownMenuProps) => (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
        <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
        <RadixDialog.Portal>
            <RadixDialog.Overlay className={styles.overlay} />
            <RadixDialog.Content className={styles.content}>
                <RadixDialog.Title className={styles.title}>{title}</RadixDialog.Title>
                <RadixDialog.Description className={styles.description}>
                    {description}
                </RadixDialog.Description>
                <div>{children}</div>

                <RadixDialog.Close asChild>
                    <button
                        className={classNames('iconButton', styles.closeButton)}
                        aria-label="Close dialog"
                    >
                        <CloseIcon width={24} height={24} />
                    </button>
                </RadixDialog.Close>
            </RadixDialog.Content>
        </RadixDialog.Portal>
    </RadixDialog.Root>
);
