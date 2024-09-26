import { createBoard, Variant } from '@wixc3/react-board';
import { CartIcon, FacebookIcon, PinterestIcon, WhatsAppIcon } from '~/components/icons';
import { LabelWithArrow } from '~/components/label-with-arrow/label-with-arrow';

import '../board-common.scss';
import styles from './buttons.board.module.scss';
import classNames from 'classnames';

export default createBoard({
    name: 'UI Kit Buttons',
    Board: () => (
        <div className="uiKitContainer">
            <div className="uiKitHeader">
                <b>UI Kit</b> | Core Components
            </div>
            <h3 className="uiKitTitle">Buttons</h3>

            <div className={classNames('uiKitSection', styles.demoWidth)}>
                <div className="uiKitSectionTitle">Themed</div>
                <div className="uiKitItem">
                    <Variant name="PrimaryButton">
                        <button className="button primaryButton">Add to Cart</button>
                    </Variant>
                    <div className="uiKitItemDescription">PrimaryButton</div>
                </div>
                <div className="uiKitItem">
                    <Variant name="PrimaryMutedButton">
                        <button className="button mutedPrimaryButton">Add to Cart</button>
                    </Variant>
                    <div className="uiKitItemDescription">PrimaryMutedButton</div>
                </div>
                <div className="uiKitItem">
                    <Variant name="SecondaryButton">
                        <button className="button secondary">Add to Cart</button>
                    </Variant>
                    <div className="uiKitItemDescription">SecondaryButton</div>
                </div>
                <div className="uiKitItem">
                    <LabelWithArrow>Shop Now</LabelWithArrow>
                    <div className="uiKitItemDescription">LabelWithArrow</div>
                </div>
            </div>

            <div className="uiKitSection">
                <div className="uiKitSectionTitle">Icons</div>
                <div className="uiKitItem">
                    <CartIcon count={3} />
                    <div className="uiKitItemDescription">CartIcon</div>
                </div>
            </div>

            <div className="uiKitSection">
                <div className="uiKitSectionTitle">Social</div>
                <div className="uiKitItem">
                    <div className={styles.row}>
                        <Variant name="WhatsApp">
                            <WhatsAppIcon className="smallIcon" />
                        </Variant>

                        <Variant name="Facebook">
                            <FacebookIcon className="smallIcon" />
                        </Variant>

                        <Variant name="Pinterest">
                            <PinterestIcon className="smallIcon" />
                        </Variant>
                    </div>
                    <div className="uiKitItemDescription">WhatsApp | Facebook | Pinterest</div>
                </div>
            </div>
        </div>
    ),
    environmentProps: {
        windowWidth: 365,
    },
    isSnippet: true,
});
