import React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import classNames from 'classnames';
import { CloseIcon } from '../icons';

import styles from './dialog.module.scss';

export interface DropdownMenuProps extends React.PropsWithChildren {
    trigger: React.ReactElement;
    title: React.ReactNode;
    description?: React.ReactNode;
}

export const Dialog = ({ trigger, title, description, children }: DropdownMenuProps) => (
    <RadixDialog.Root>
        <RadixDialog.Trigger asChild>
            <button className="Button violet">Edit profile</button>
        </RadixDialog.Trigger>
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
                        aria-label="Close"
                    >
                        <CloseIcon width={24} height={24} />
                    </button>
                </RadixDialog.Close>
            </RadixDialog.Content>
        </RadixDialog.Portal>
    </RadixDialog.Root>
);
