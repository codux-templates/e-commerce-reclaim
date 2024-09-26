import { createBoard, Variant } from '@wixc3/react-board';
import { CategoryLink } from '~/components/category-link/category-link';
import { LabelWithArrow } from '~/components/label-with-arrow/label-with-arrow';
import ComponentWrapper from '_codux/board-wrappers/component-wrapper';
import { BackgroundParallax, FloatIn } from '~/components/visual-effects';
import classNames from 'classnames';
import '../board-common.scss';
import styles from './sections.board.module.scss';
import { FeaturedProductsSection } from '~/components/featured-products-section/featured-products-section';

export default createBoard({
    name: 'Sections',
    Board: () => (
        <ComponentWrapper>
            <div className={styles.container}>
                <div className={classNames('uiKitHeader', styles.fontLarge)}>
                    <b>UI Kit</b> | Core Components
                </div>
                <h3 className={classNames('uiKitTitle', styles.fontLarge)}>Sections</h3>
                <div className="uiKitSection">
                    <div className="uiKitItem">
                        <Variant name="Hero Banner">
                            <div className="heroBanner">
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
                        <span className={classNames('uiKitItemDescription', styles.fontLarge)}>
                            Hero Banner
                        </span>
                    </div>

                    <div className="uiKitItem">
                        <Variant name="Promotional">
                            <BackgroundParallax
                                className="floatingCardBackground"
                                backgroundImageUrl="https://static.wixstatic.com/media/c837a6_cae4dbe5a7ee4637b7d55d9bd5bd755d~mv2.png/v1/fill/w_1178,h_974,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/c837a6_cae4dbe5a7ee4637b7d55d9bd5bd755d~mv2.png"
                            >
                                <FloatIn direction="up">
                                    <div className="floatingCard">
                                        <div className="floatingCardHeader">Happy Holidays</div>
                                        <div className="floatingCardContent">
                                            <h2 className="floatingCardTitle">The holiday</h2>
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
                        <span className={classNames('uiKitItemDescription', styles.fontLarge)}>
                            Promotional
                        </span>
                    </div>

                    <div className="uiKitItem">
                        <Variant name="Featured Products">
                            <FeaturedProductsSection
                                categorySlug="new-in"
                                title="New In"
                                description="Embrace a sustainable lifestyle with our newest drop-ins."
                            />
                        </Variant>
                        <span className={classNames('uiKitItemDescription', styles.fontLarge)}>
                            Featured Products
                        </span>
                    </div>
                </div>
            </div>
        </ComponentWrapper>
    ),
    isSnippet: true,
    environmentProps: {
        windowWidth: 1660,
        windowHeight: 1800,
    },
});
