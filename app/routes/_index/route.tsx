import { CategoryLink } from '~/components/category-link/category-link';
import styles from './index.module.scss';
import { LabelWithArrow } from '~/components/label-with-arrow/label-with-arrow';

export default function HomePage() {
    return (
        <>
            <div className={styles.heroBanner}>
                <img
                    src="https://static.wixstatic.com/media/32aab9_2c3c65e142434906992aedb17db53566~mv2.jpg"
                    className={styles.heroBannerImage}
                    alt=""
                />
                <div className={styles.heroBannerOverlay}>
                    <div className={styles.heroBannerSubtitle}>ReClaim</div>
                    <h1 className={styles.heroBannerTitle}>Reuse. Repurpose. Relove.</h1>
                    <CategoryLink categorySlug="all-products">
                        <LabelWithArrow>Shop Collections</LabelWithArrow>
                    </CategoryLink>
                </div>
            </div>

            <div className="textBanner">
                <div className="textBannerSubtitle">Products of the highest standards</div>
                <div className="textBannerTitle">
                    Essential home collections for sustainable living
                </div>
                <CategoryLink categorySlug="all-products">
                    <LabelWithArrow>Shop Collections</LabelWithArrow>
                </CategoryLink>
            </div>
        </>
    );
}
