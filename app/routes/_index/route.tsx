import { CategoryLink } from '~/components/category-link/category-link';
import styles from './index.module.scss';
import { LabelWithArrow } from '~/components/label-with-arrow/label-with-arrow';

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

            <div className="textBanner">
                <div className="textBannerSubtitle">Products of the highest standards</div>
                <div className="textBannerTitle">
                    Essential home collections for sustainable living
                </div>
                <CategoryLink categorySlug="all-products">
                    <LabelWithArrow>Shop Collections</LabelWithArrow>
                </CategoryLink>
            </div>

            <div className={styles.rowOfCards}>
                <CategoryLink categorySlug="kitchen" className="cardZoom">
                    <img
                        className="cardBackground"
                        src="https://static.wixstatic.com/media/c837a6_c05a03f48fbd49e7b5046d1b18c930eb~mv2.jpg/v1/fill/w_547,h_730,q_90/c837a6_c05a03f48fbd49e7b5046d1b18c930eb~mv2.jpg"
                        alt=""
                    />
                    <div className="cardTitle">Kitchen</div>
                </CategoryLink>
                <CategoryLink categorySlug="bath" className="cardZoom">
                    <img
                        className="cardBackground"
                        src="https://static.wixstatic.com/media/c837a6_269f35d6ccff4321b7ed1e65c2835c61~mv2.jpg/v1/fill/w_548,h_730,q_90/c837a6_269f35d6ccff4321b7ed1e65c2835c61~mv2.jpg"
                        alt=""
                    />
                    <div className="cardTitle">Bath</div>
                </CategoryLink>
                <CategoryLink categorySlug="on-the-go" className="cardZoom">
                    <img
                        className="cardBackground"
                        src="https://static.wixstatic.com/media/c837a6_d38d8d08196d477ba49efff880d5b918~mv2.jpg/v1/fill/w_547,h_730,q_90/c837a6_d38d8d08196d477ba49efff880d5b918~mv2.jpg"
                        alt=""
                    />
                    <div className="cardTitle">On the Go</div>
                </CategoryLink>
            </div>
        </>
    );
}
