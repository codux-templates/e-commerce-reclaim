import '~/styles/common.scss';
import { createBoard, Variant } from '@wixc3/react-board';
import styles from './components.board.module.scss';
import classNames from 'classnames';
import styles0 from './components.board.module.scss';
import { QuantityInput } from '../../src/components/quantity-input/quantity-input';
import { Accordion } from '../../src/components/accordion/accordion';
import { ProductCard } from '../../src/components/product-card/product-card';

export default createBoard({
    name: 'Components',
    Board: () => (
        <div className={styles.container}>
            <div>
                <span className={styles.uikit}>UI Kit</span>
                <span className={styles.foundation}> | Core components</span>
                <hr className={styles.hrSolid} />
                <h3 className={styles.sectionTitle}>Components &amp; Elements</h3>
                <h4 className={styles.sectionHeader}>INPUT</h4>
            </div>
            <QuantityInput className={styles0.quantityInput} />
            <span className={styles.fontDetails}>Text Input</span>
            <QuantityInput value={6} className={styles0.quantityInput1} />
            <span className={styles.fontDetails}>Number Input</span>
            <Variant name="Heading1">
                <hr className={styles.hrLight} />
                <h4 className={styles.sectionHeader}>ACCORDION</h4>
                <Accordion
                    items={[
                        {
                            title: 'Product Info',
                        },
                        {
                            title: 'Return & Refund Policy',
                        },
                        {
                            title: 'Shipping Info ',
                        },
                    ]}
                    className={styles0.accordion}
                />
                <hr className={styles.hrLight} />
            </Variant>
            <p className={classNames(styles.variantName, styles.headlinesSpacing)}></p>
            <h4 className={styles.sectionHeader}>LABELS</h4>
            <hr className={styles.hrLight} />
            <h4 className={styles.sectionHeader}>CARDS</h4>
            <ProductCard
                name="Bamboo Toothbrush"
                imageUrl="https://static.wixstatic.com/media/c837a6_18152edaef9940ca88f446ae94b48a47~mv2.jpg/v1/fill/w_824,h_1098,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c837a6_18152edaef9940ca88f446ae94b48a47~mv2.jpg"
                ribbon="NEW"
                priceData={{
                    currency: '$',
                    price: 5.5,
                }}
            />
            <Variant name="Heading2">
                <h2 className="heading2"></h2>
            </Variant>
            <p className={classNames(styles.variantName, styles.headlinesSpacing)}>
                --heading1
                <span className={styles.fontDetails}>Marcellus / 80px / 1</span>
            </p>
            <Variant name="Heading3">
                <h3 className="heading3">Heading 3</h3>
            </Variant>
            <Variant name="Heading4">
                <h4 className="heading4">Heading 4</h4>
            </Variant>
            <Variant name="Heading5">
                <h5 className="heading5">Heading 5</h5>
            </Variant>
            <h6 className="heading6">Heading 6</h6>

            <p className="paragraph1">Paragraph 1</p>
            <p className="paragraph2">Paragraph 2</p>
            <p className="paragraph3">Paragraph 3</p>
        </div>
    ),
    environmentProps: {
        windowWidth: 587,
        windowHeight: 460,
    },
    isSnippet: true,
});
