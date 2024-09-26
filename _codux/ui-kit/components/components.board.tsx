import '../../../src/styles/common.scss';
import { createBoard, Variant } from '@wixc3/react-board';
import classNames from 'classnames';
import { Accordion } from '~/components/accordion/accordion';
import { ProductCard } from '~/components/product-card/product-card';
import { QuantityInput } from '~/components/quantity-input/quantity-input';
import ComponentWrapper from '_codux/board-wrappers/component-wrapper';

import styles from './components.board.module.scss';
import productCardStyles from '../../../src/components/product-card/product-card.module.scss';

export default createBoard({
    name: 'Components',
    Board: () => (
        <ComponentWrapper>
            <div className={styles.container}>
                <div>
                    <span className={styles.uikit}>UI Kit</span>
                    <span className={styles.foundation}> | Core components</span>
                    <hr className={styles.hrSolid} />
                    <h3 className={styles.sectionTitle}>Components &amp; Elements</h3>
                    <h4 className={styles.sectionHeader}>INPUT</h4>
                </div>
                <Variant name="Number Input">
                    <QuantityInput
                        value={6}
                        className={styles.quantityInput1}
                        onChange={() => {}}
                    />
                </Variant>
                <span className={styles.fontDetails}>Number Input</span>
                <hr className={styles.hrLight} />
                <h4 className={styles.sectionHeader}>ACCORDION</h4>
                    <Variant name="Accordion">
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
                            className={styles.accordion}
                        />
                    </Variant>
                    <hr className={styles.hrLight} />
                <p className={classNames(styles.variantName, styles.headlinesSpacing)}></p>
                <h4 className={styles.sectionHeader}>LABELS</h4>
                <div className="relativeContainer">
                    <Variant name="Label">
                        <span className={productCardStyles.ribbon}>I&apos;M A LABEL</span>
                    </Variant>
                </div>
                <hr className={styles.hrLight} />
                <h4 className={styles.sectionHeader}>CARDS</h4>
                <Variant name="Product Card">
                    <ProductCard
                        name="Bamboo Toothbrush"
                        imageUrl="https://static.wixstatic.com/media/c837a6_18152edaef9940ca88f446ae94b48a47~mv2.jpg/v1/fill/w_824,h_1098,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c837a6_18152edaef9940ca88f446ae94b48a47~mv2.jpg"
                        ribbon="NEW"
                        price="$6"
                        discountedPrice="$5.5"
                    />
                </Variant>
                <span className={styles.fontDetails}>Product Card</span>
            </div>
        </ComponentWrapper>
    ),
    environmentProps: {
        windowWidth: 423,
        windowHeight: 756,
    },
    isSnippet: true,
});
