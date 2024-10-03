import { useState } from 'react';
import classNames from 'classnames';
import { getClickableElementAttributes } from '~/utils';
import { MinusIcon, PlusIcon } from '../icons';

import styles from './accordion.module.scss';

interface AccordionItem {
    title: string;
    content: React.ReactNode;
}

interface AccordionProps {
    items: AccordionItem[];
    className?: string;
}

export const Accordion = ({ items, className }: AccordionProps) => {
    const [openItemIndex, setOpenItemIndex] = useState<number | null>(0);

    return (
        <div className={className}>
            {items.map((item, index) => {
                const isOpen = openItemIndex === index;
                return (
                    <div key={index} className={styles.item}>
                        <div
                            className={styles.header}
                            {...getClickableElementAttributes(() =>
                                setOpenItemIndex(isOpen ? null : index),
                            )}
                        >
                            <p className={styles.title}>{item.title}</p>

                            {isOpen ? (
                                <MinusIcon className={styles.toggleIcon} />
                            ) : (
                                <PlusIcon className={styles.toggleIcon} />
                            )}
                        </div>

                        <div
                            className={classNames(styles.content, {
                                [styles.expanded]: isOpen,
                            })}
                        >
                            <div className={styles.contentExpander}>
                                <div className={styles.contentWrapper}>{item.content}</div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
