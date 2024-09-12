import classNames from 'classnames';
import styles from './cart-icon.module.scss';

interface CartIconProps {
    className?: string;
    children: string;
}

export const CartIcon = (props: CartIconProps) => {
    return (
        <div className={classNames(styles.root, props.className)}>
            <div className={styles.handle}></div>
            <div className={styles.bag}>{props.children}</div>
        </div>
    );
};
