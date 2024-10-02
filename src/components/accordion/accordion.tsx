import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
                    <AccordionItem
                        key={index}
                        isOpen={isOpen}
                        onToggle={() => setOpenItemIndex(isOpen ? null : index)}
                        {...item}
                    />
                );
            })}
        </div>
    );
};

interface AccordionItemProps extends AccordionItem {
    isOpen: boolean;
    onToggle: () => void;
}

const AccordionItem = ({ isOpen, onToggle, title, content }: AccordionItemProps) => {
    const contentRef = useRef<HTMLDivElement | null>(null);

    const isOpenRef = useRef(isOpen);
    isOpenRef.current = isOpen;

    const handleAnimationComplete = () => {
        if (contentRef.current && isOpenRef.current) {
            // Allow the content to overflow when the accordion item is fully expanded.
            // This is useful when the content contains an element that, under certain conditions,
            // must go beyond the content (e.g. a box-shadow on focus).
            contentRef.current.style.removeProperty('overflow');
        }
    };

    return (
        <div className={styles.item}>
            <div className={styles.header} {...getClickableElementAttributes(onToggle)}>
                <p className={styles.title}>{title}</p>

                {isOpen ? (
                    <MinusIcon className={styles.toggleIcon} />
                ) : (
                    <PlusIcon className={styles.toggleIcon} />
                )}
            </div>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        ref={contentRef}
                        initial={{ height: 0, overflow: 'auto' }}
                        animate={{ height: 'auto', overflow: 'auto' }}
                        exit={{ height: 0, overflow: 'auto' }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        onAnimationComplete={handleAnimationComplete}
                    >
                        <div className={styles.content}>{content}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
