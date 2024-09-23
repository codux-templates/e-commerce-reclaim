import { createBoard, Variant } from '@wixc3/react-board';
import classNames from 'classnames';
import { LabelWithArrow } from '~/components/label-with-arrow/label-with-arrow';

import styles from './ui-kit-buttons.board.module.scss';

export default createBoard({
    name: 'UI Kit Buttons',
    Board: () => (
        <div className={styles.container}>
            <div>
                <span className={styles.uikit}>UI Kit</span>
                <span className={styles.foundation}> | Core Components</span>
                <hr className={styles.hrSolid} />
                <h3 className={styles.sectionTitle}>Buttons</h3>
            </div>
            <LabelWithArrow>Shop Now</LabelWithArrow>
            <h4 className={styles.sectionHeader}>THEMED</h4>
            <div className={classNames(styles.buttonsContainer, styles.itemSpacing)}>
                <div className={styles.buttonsContainer}>
                    <button className="button primaryButton">Add to Cart</button>
                    <span className={styles.buttonLabel}>Primary</span>
                </div>
                <div className={styles.buttonsContainer}>
                    <button className="button mutedPrimaryButton">Add to Cart</button>
                    <span className={styles.buttonLabel}>Primary Muted</span>
                </div>
                <div className={styles.buttonsContainer}>
                    <button className="button">Add to Cart</button>
                    <span className={styles.buttonLabel}>Secondary</span>
                </div>
            </div>
            <hr className={styles.hrLight} />
            <h4 className={styles.sectionHeader}>MENU</h4>
            <Variant name="Menu">Menu component goes here</Variant>
            <hr className={styles.hrLight} />
            <h4 className={styles.sectionHeader}>ICONS</h4>
            <Variant name="Icons">Icons component goes here</Variant>
            <hr className={styles.hrLight} />
            <h4 className={styles.sectionHeader}>SOCIAL</h4>
            <Variant name="Social">Social media buttons go here</Variant>
            <hr className={styles.hrLight} />
        </div>
    ),
    environmentProps: {
        windowWidth: 284,
    },
    isSnippet: true,
});
