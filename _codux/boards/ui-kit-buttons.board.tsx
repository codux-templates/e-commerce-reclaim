import { createBoard } from '@wixc3/react-board';
import { Button } from '../../src/components/button/button';
import styles from './ui-kit-buttons.board.module.scss';
import { LabelWithArrow } from '../../src/components/label-with-arrow/label-with-arrow';
import { Link, NavLink } from '@remix-run/react';
import { ROUTES } from '~/router/config';

export default createBoard({
    name: 'UI-Kit Buttons',
    Board: () => (
        <div className={styles.container}>
            <div>
                <h2>Buttons</h2>
                <div className={styles.primaryContainer}>
                    <LabelWithArrow>Shop Collection </LabelWithArrow>
                    <p>Primary </p>
                </div>
                <div className={styles.secondaryContainer}>
                    // Link for "Shop now goes here"
                    <p>Secondary</p>
                </div>
                <div className={styles.addToCartContainer}>
                    <Button className={styles.fullWidth}>Add to Cart</Button>
                    <p>Add to Cart</p>
                </div>
            </div>
            <div>
                <h2>Menus </h2>
                <div />
                // Menu Component goes here
            </div>
        </div>
    ),
});
