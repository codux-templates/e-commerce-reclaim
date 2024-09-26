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
                    <Variant name="Primary Button">
                        <button className="button primaryButton">Add to Cart</button>
                    </Variant>
                    <div className="uiKitItemDescription">Primary Button</div>
                </div>
                <div className="uiKitItem">
                    <Variant name="Primary Muted Button">
                        <button className="button mutedPrimaryButton">Add to Cart</button>
                    </Variant>
                    <div className="uiKitItemDescription">Primary Muted Button</div>
                </div>
                <div className="uiKitItem">
                    <Variant name="Secondary Button">
                        <button className="button secondary">Add to Cart</button>
                    </Variant>
                    <div className="uiKitItemDescription">Secondary Button</div>
                </div>
                <div className="uiKitItem">
                    <Variant name="Label With Arrow">
                        <LabelWithArrow>Shop Now</LabelWithArrow>
                    </Variant>
                    <div className="uiKitItemDescription">Label With Arrow</div>
                </div>
            </div>

            <div className="uiKitSection">
                <div className="uiKitSectionTitle">Icons</div>
                <div className={styles.itemsGroup}>
                    <div className="uiKitItem">
                        <div className={styles.icon}>
                            <Variant name="Cart Icon">
                                <CartIcon count={3} />
                            </Variant>
                        </div>
                        <div className="uiKitItemDescription">Cart</div>
                    </div>
                    <div className="uiKitItem">
                        <div className={styles.icon}>
                            <Variant name="Trash Icon">
                                <TrashIcon className={styles.trashIcon} />
                            </Variant>
                        </div>
                        <div className="uiKitItemDescription">Trash</div>
                    </div>
                    <div className="uiKitItem">
                        <div className={styles.icon}>
                            <Variant name="Lock Icon">
                                <LockIcon className={styles.lockIcon} />
                            </Variant>
                        </div>
                        <div className="uiKitItemDescription">Lock</div>
                    </div>
                    <div className="uiKitItem">
                        <div className={styles.icon}>
                            <Variant name="Error Icon">
                                <ErrorIcon className={styles.errorIcon} />
                            </Variant>
                        </div>
                        <div className="uiKitItemDescription">Error</div>
                    </div>
                    <div className="uiKitItem">
                        <div className={styles.icon}>
                            <Variant name="Menu Icon">
                                <MenuIcon className={styles.menuIcon} />
                            </Variant>
                        </div>
                        <div className="uiKitItemDescription">Menu</div>
                    </div>
                    <div className="uiKitItem">
                        <div className={styles.icon}>
                            <Variant name="Chevron Icon">
                                <ChevronRightIcon className={styles.chevronRightIcon} />
                            </Variant>
                        </div>
                        <div className="uiKitItemDescription">Chevron</div>
                    </div>
                    <div className="uiKitItem">
                        <div className={styles.icon}>
                            <Variant name="Label With Arrow">
                                <ArrowRightIcon className={styles.arrowRightIcon} />
                            </Variant>
                        </div>
                        <div className="uiKitItemDescription">Label With Arrow</div>
                    </div>
                </div>
            </div>

            <div className="uiKitSection">
                <div className="uiKitSectionTitle">Social</div>
                <div className="uiKitItem">
                    <div className={styles.itemsGroup}>
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
        windowWidth: 425,
    },
    isSnippet: true,
});
