import { createBoard, Variant } from '@wixc3/react-board';
import '~/styles/common.scss';
import classNames from 'classnames';
import styles from './sections.board.module.scss';
import { CategoryLink, CategoryLinkProps } from '~/components/category-link/category-link';
import { LabelWithArrow } from '~/components/label-with-arrow/label-with-arrow';
import { NavLink, NavLinkProps } from '@remix-run/react';
import { ROUTES } from '~/router/config';


export default createBoard({
    name: 'Sections',
    Board: () => (
        <NavLink to={ROUTES.products.to(categorySlug)} className={className}>
        <div className={styles.container}>
            <div>
                <span className={styles.uikit}>UI Kit</span>
                <span className={styles.foundation}> | Core Components</span>
                <hr className={styles.hrSolid} />
                <h3 className={styles.sectionTitle}>Sections</h3>
            </div>
            <h4 className={styles.sectionHeader}></h4>
            <Variant name="Hero">
                <div className={styles.heroBanner}>
                    <img
                        src="https://static.wixstatic.com/media/32aab9_2c3c65e142434906992aedb17db53566~mv2.jpg"
                        className={styles.heroBannerImage}
                        alt=""
                    />
                    <div className={styles.heroBannerOverlay}>
                        <div className={styles.heroBannerSubtitle}>ReClaim</div>
                        <h1 className={styles.heroBannerTitle}>Reuse. Repurpose. Relove.</h1>
                        <CategoryLink categorySlug="all-products">
                            <LabelWithArrow>Shop Collections</LabelWithArrow>
                        </CategoryLink>
                    </div>
                </div>
            </Variant>
        </div>
     </NavLink>

    ),
    isSnippet: true,
    environmentProps: {
        windowWidth: 751,
    },
});
