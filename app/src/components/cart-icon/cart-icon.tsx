import classNames from 'classnames';
import styles from './cart-icon.module.scss';

interface CartIconProps {
    className?: string;
    children: string;
}

export const CartIcon = (props: CartIconProps) => {
    return (
        <button className={classNames(styles.root, props.className)}>
            <div className={styles.bag}>
                <div className={styles.text}>{props.children}</div>
                <div className={styles.handles}></div>
            </div>
        </button>
    );
};
