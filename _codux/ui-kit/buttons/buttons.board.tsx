import { createBoard, Variant } from '@wixc3/react-board';
import { CartIcon, FacebookIcon, PinterestIcon, WhatsAppIcon } from '~/components/icons';
import { LabelWithArrow } from '~/components/label-with-arrow/label-with-arrow';

import '../board-common.scss';
import styles from './buttons.board.module.scss';
import classNames from 'classnames';
import { TrashIcon } from '../../../src/components/icons/trash-icon';
import { LockIcon } from '../../../src/components/icons/lock-icon';
import { ErrorIcon } from '../../../src/components/icons/error-icon';
import { MenuIcon } from '../../../src/components/icons/menu-icon';
import { ChevronRightIcon } from '../../../src/components/icons/chevron-right-icon';
import { ArrowRightIcon } from '../../../src/components/icons/arrow-right-icon';

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
                <div className={styles.itemsGroup}>
                    <div className="uiKitItem">
                        <div className={styles.icon}>
                            <CartIcon count={3} />
                        </div>
                        <div className="uiKitItemDescription">CartIcon</div>
                    </div>
                    <div className="uiKitItem">
                        <div className={styles.icon}>
                            <TrashIcon className={styles.trashIcon} />
                        </div>
                        <div className="uiKitItemDescription">TrashIcon</div>
                    </div>
                    <div className="uiKitItem">
                        <div className={styles.icon}>
                            <LockIcon className={styles.lockIcon} />
                        </div>
                        <div className="uiKitItemDescription">LockIcon</div>
                    </div>
                    <div className="uiKitItem">
                        <div className={styles.icon}>
                            <ErrorIcon className={styles.errorIcon} />
                        </div>
                        <div className="uiKitItemDescription">ErrorIcon</div>
                    </div>
                    <div className="uiKitItem">
                        <div className={styles.icon}>
                            <MenuIcon className={styles.menuIcon} />
                        </div>
                        <div className="uiKitItemDescription">MenuIcon</div>
                    </div>
                    <div className="uiKitItem">
                        <div className={styles.icon}>
                            <ChevronRightIcon className={styles.chevronRightIcon} />
                        </div>
                        <div className="uiKitItemDescription">ChevronIcon</div>
                    </div>
                    <div className="uiKitItem">
                        <div className={styles.icon}>
                            <ArrowRightIcon className={styles.arrowRightIcon} />
                        </div>
                        <div className="uiKitItemDescription">ArrowRightIcon</div>
                    </div>
                </div>
            </div>

            <div className="uiKitSection">
                <div className="uiKitSectionTitle">Social</div>
                <div className="uiKitItem">
                    <div className={styles.row}>
                        <WhatsAppIcon className="smallIcon" />
                        <FacebookIcon className="smallIcon" />
                        <PinterestIcon className="smallIcon" />
                    </div>
                    <div className="uiKitItemDescription">
                        WhatsAppIcon | FacebookIcon | PinterestIcon
                    </div>
                </div>
            </div>
        </div>
    ),
    environmentProps: {
        windowWidth: 365,
    },
    isSnippet: true,
});
