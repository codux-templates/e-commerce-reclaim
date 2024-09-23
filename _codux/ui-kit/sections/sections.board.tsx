import { createBoard, Variant } from '@wixc3/react-board';
import styles from './sections.board.module.scss';
import { CategoryLink } from '~/components/category-link/category-link';
import { LabelWithArrow } from '~/components/label-with-arrow/label-with-arrow';
import ComponentWrapper from '_codux/board-wrappers/component-wrapper';
import { BackgroundParallax, FloatIn } from '~/components/visual-effects';

export default createBoard({
    name: 'Sections',
    Board: () => (
        <ComponentWrapper>
            <div className={styles.container}>
                <div>
                    <span className={styles.uikit}>UI Kit</span>
                    <span className={styles.foundation}>| Core Components</span>
                    <hr className={styles.hrSolid} />
                    <h3 className={styles.sectionTitle}>Sections</h3>
                </div>
                <Variant name="Hero">
                    <div className={'heroBanner'}>
                        <img
                            src="https://static.wixstatic.com/media/32aab9_2c3c65e142434906992aedb17db53566~mv2.jpg"
                            className={'heroBannerImage'}
                            alt=""
                        />
                        <div className={'heroBannerOverlay'}>
                            <div className={'heroBannerSubtitle'}>ReClaim</div>
                            <h1 className={'heroBannerTitle'}>Reuse. Repurpose. Relove.</h1>
                            <CategoryLink categorySlug="all-products">
                                <LabelWithArrow>Shop Collections</LabelWithArrow>
                            </CategoryLink>
                        </div>
                    </div>
                </Variant>
                <span className={styles.variantName}>Hero</span>
                <Variant name="Promotional">
                    <BackgroundParallax
                        className={styles.floatingCardBackground}
                        backgroundImageUrl="https://static.wixstatic.com/media/c837a6_cae4dbe5a7ee4637b7d55d9bd5bd755d~mv2.png/v1/fill/w_1178,h_974,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/c837a6_cae4dbe5a7ee4637b7d55d9bd5bd755d~mv2.png"
                    >
                        <FloatIn direction="up">
                            <div className="floatingCard">
                                <div className="floatingCardHeader">Happy Holidays</div>
                                <div className="floatingCardContent">
                                    <h2 className="floatingCardTitle">The holidays best sellers</h2>
                                    <div className="floatingCardDescription">
                                        Home essentials for
                                        <br /> sustainable living
                                    </div>
                                </div>
                                <CategoryLink categorySlug="all-products">
                                    <LabelWithArrow>Buy a gift</LabelWithArrow>
                                </CategoryLink>
                            </div>
                        </FloatIn>
                    </BackgroundParallax>
                </Variant>
            </div>
        </ComponentWrapper>
    ),
    isSnippet: true,
    environmentProps: {
        windowWidth: 2230,
        windowHeight: 2592,
    },
});
