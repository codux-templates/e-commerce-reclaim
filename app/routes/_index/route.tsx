import { CategoryLink } from '~/components/category-link/category-link';
import styles from './index.module.scss';
import heroImageJpg from '~/assets/img/heroImage.jpg';
import { LabelWithArrow } from '~/components/label-with-arrow/label-with-arrow';

export default function HomePage() {
    return (
        <>
            <div className={styles.heroImage}>
                <img src={heroImageJpg} alt="Hero banner" />
                <div className={styles.overlay}>
                    <div className={styles.subtitle}>ReClaim</div>
                    <h1 className={styles.title}>Reuse. Repurpose. Relove.</h1>
                    <CategoryLink categorySlug="all-products" className={styles.overlayLink}>
                        <LabelWithArrow>Shop Collections</LabelWithArrow>
                    </CategoryLink>
                </div>
            </div>
            <p>Home page</p>
        </>
    );
}
