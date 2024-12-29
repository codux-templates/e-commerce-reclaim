import React from 'react';
import { Content, Item, NavigationMenuItemProps, Trigger } from '@radix-ui/react-navigation-menu';
import { StateIndicatorIcon } from '../state-indicator-icon/state-indicator-icon';
import styles from './menu-section.module.css';
import classNames from 'classnames';

interface MenuSectionProps extends NavigationMenuItemProps, React.RefAttributes<HTMLLIElement> {
    trigger: string;
}

export const MenuSection = React.forwardRef<React.ElementRef<typeof Item>, MenuSectionProps>(
    ({ className, children, trigger, ...props }, forwardedRef) => (
        <Item {...props} className={classNames(styles.root, className)} ref={forwardedRef}>
            <Trigger
                className={classNames(styles.trigger)}
                onPointerEnter={(event) => event.preventDefault()}
                onPointerMove={(event) => event.preventDefault()}
                onPointerLeave={(event) => event.preventDefault()}
            >
                {trigger}
                <StateIndicatorIcon className={styles.chevron} />
            </Trigger>
            <Content
                className={classNames(styles.contentContainer)}
                onPointerLeave={(event) => event.preventDefault()}
            >
                <div className={classNames(styles.content)}>{children}</div>
            </Content>
        </Item>
    ),
);

MenuSection.displayName = 'MenuSection';
