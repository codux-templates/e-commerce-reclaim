import { CategoryLink } from '~/components/category-link/category-link';
import { LabelWithArrow } from '~/components/label-with-arrow/label-with-arrow';
import styles from './index.module.scss';

export default function HomePage() {
    return (
        <>
            <div className={styles.heroBanner}>
                <img
                    src="https://static.wixstatic.com/media/32aab9_2c3c65e142434906992aedb17db53566~mv2.jpg"
                    alt=""
                />
                <div className={styles.overlay}>
                    <div className={styles.subtitle}>ReClaim</div>
                    <h1 className={styles.title}>Reuse. Repurpose. Relove.</h1>
                    <CategoryLink categorySlug="all-products">
                        <LabelWithArrow>Shop Collections</LabelWithArrow>
                    </CategoryLink>
                </div>
            </div>

            <div className={styles.textBanner}>
                <div className={styles.textBannerSubtitle}>Products of the highest standards</div>
                <div className={styles.textBannerTitle}>
                    Essential home collections for sustainable living
                </div>
                <CategoryLink categorySlug="all-products">
                    <LabelWithArrow>Shop Collections</LabelWithArrow>
                </CategoryLink>
            </div>
        </>
    );
}
