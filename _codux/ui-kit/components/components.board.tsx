import { createBoard } from '@wixc3/react-board';
import { Accordion } from '~/components/accordion/accordion';
import { ProductCard } from '~/components/product-card/product-card';
import { QuantityInput } from '~/components/quantity-input/quantity-input';

import '../board-common.scss';
import styles from './components.board.module.scss';
import classNames from 'classnames';
import { CategoryLink } from '~/components/category-link/category-link';
import ComponentWrapper from '_codux/board-wrappers/component-wrapper';

export default createBoard({
    name: 'Components',
    Board: () => (
        <ComponentWrapper>
            <div className="uiKitContainer">
                <div className="uiKitHeader">
                    <b>UI Kit</b> | Core Components
                </div>
                <h3 className="uiKitTitle">Components & Elements</h3>

                <div className="uiKitSection">
                    <div className="uiKitSectionTitle">Input</div>
                    <div className="uiKitItem">
                        <QuantityInput
                            value={6}
                            className={styles.quantityInput1}
                            onChange={() => {}}
                        />
                        <span className="uiKitItemDescription">Number Input</span>
                    </div>
                </div>

                <div className="uiKitSection">
                    <div className="uiKitSectionTitle">Accordion</div>
                    <div className="uiKitItem">
                        <Accordion
                            items={[
                                {
                                    title: 'Product Info',
                                    content: 'Content',
                                },
                                {
                                    title: 'Return & Refund Policy',
                                    content: 'Content',
                                },
                                {
                                    title: 'Shipping Info ',
                                    content: 'Content',
                                },
                            ]}
                            className={styles.demoWidth}
                        />
                        <span className="uiKitItemDescription">Accordion</span>
                    </div>
                </div>

                <div className="uiKitSection">
                    <div className="uiKitSectionTitle">Cards</div>
                    <div className={classNames('uiKitItem', styles.demoWidth)}>
                        <ProductCard
                            name="Bamboo Toothbrush"
                            imageUrl="https://static.wixstatic.com/media/c837a6_18152edaef9940ca88f446ae94b48a47~mv2.jpg/v1/fill/w_824,h_1098,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c837a6_18152edaef9940ca88f446ae94b48a47~mv2.jpg"
                            ribbon="NEW"
                            price="$5.5"
                        />
                        <span className="uiKitItemDescription">ProductCard</span>
                    </div>

                    <div className="uiKitItem">
                        <CategoryLink
                            categorySlug="all-products"
                            className={classNames('linkCard', styles.demoWidth, styles.linkCard)}
                        >
                            <img
                                className="linkCardBackground"
                                src="https://static.wixstatic.com/media/c837a6_c05a03f48fbd49e7b5046d1b18c930eb~mv2.jpg/v1/fill/w_547,h_730,q_90/c837a6_c05a03f48fbd49e7b5046d1b18c930eb~mv2.jpg"
                                alt=""
                            />
                            <div className="linkCardTitle">All Products</div>
                        </CategoryLink>
                        <span className="uiKitItemDescription">LinkCard</span>
                    </div>
                </div>
            </div>
        </ComponentWrapper>
    ),
    environmentProps: {
        windowWidth: 364,
        windowHeight: 756,
    },
    isSnippet: true,
});
