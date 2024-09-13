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
                <source media="(1400px <= width)" srcSet={heroImage} />
                {/* <img src={heroImage} className={styles.image} alt="Hero background" /> */}
            </picture>
            <div className={styles.overlay}>
                <p className={styles.subTitle}>{subTitle}</p>
                <h1 className={styles.title}>{title} </h1>
                {linkLabel && linkCategorySlug && (
                    <StretchableLink className={styles.overlayButton}>
                        <CategoryLink title={linkLabel} categorySlug={linkCategorySlug} />
                    </StretchableLink>
                )}
            </div>
        </div>
    );
};
