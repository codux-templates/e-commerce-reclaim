import classNames from 'classnames';
import heroImage from '~/assets/img/heroImage.jpg';
import styles from './hero-image.module.scss';
import { StretchableLink } from '../stretchable-link/stretchable-link';

export interface HeroImageProps {
    subTitle: string;
    title: string;
    className?: string;
    linkLabel?: string;
    linkCategorySlug?: string;
}

export const HeroImage = ({
    subTitle,
    title,
    linkLabel,
    linkCategorySlug,
    className,
}: HeroImageProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <picture>
                <img src={heroImage} className={styles.image} alt="Hero banner" />
            </picture>
            <div className={styles.overlay}>
                <p className={styles.subTitle}>{subTitle}</p>
                <h1 className={styles.title}>{title}</h1>
                {linkLabel && linkCategorySlug && (
                    <StretchableLink
                        title={linkLabel}
                        className={styles.overlayLink}
                        categorySlug={linkCategorySlug}
                    />
                )}
            </div>
        </div>
    );
};
