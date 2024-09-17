import React from 'react';
import styles from './text-banner.module.scss';
import classNames from 'classnames';

interface TextBannerProps {
    title: string;
    children?: React.ReactNode;
    subtitle?: string;
    className?: string;
}

export const TextBanner = ({ title, subtitle, className, children }: TextBannerProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.subtitle}>{subtitle}</div>
            <h1 className={styles.title}>{title}</h1>
            {children}
        </div>
    );
};

export default TextBanner;
