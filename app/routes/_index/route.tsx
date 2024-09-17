import { CategoryLink } from '~/components/category-link/category-link';
import { LabelWithArrow } from '~/components/label-with-arrow/label-with-arrow';
import { TextBanner } from '~/components/text-banner/text-banner';
import styles from './index.module.scss';

export default function HomePage() {
    return (
        <>
            <TextBanner
                subtitle="Products of the highest standards"
                title="Essential home collections for sustainable living"
                className={styles.textBanner}
            >
                <CategoryLink categorySlug="all-products">
                    <LabelWithArrow className={styles.textBannerLink}>Shop Collections</LabelWithArrow>
                </CategoryLink>
            </TextBanner>
        </>
    );
}
