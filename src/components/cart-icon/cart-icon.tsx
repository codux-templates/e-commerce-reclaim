import classNames from 'classnames';
import styles from './cart-icon.module.scss';

interface CartIconProps {
    className?: string;
    children: string;
}

export const CartIcon = (props: CartIconProps) => {
    return (
        <div className={classNames(styles.root, props.className)}>
            <svg width="21px" height="25px" viewBox="0 0 31 35">
                <text x="50%" y="28" textAnchor="middle" className={styles.count}>
                    {props.children}
                </text>
                <path d="M15.411.094c3.538 0 6.417 3.01 6.436 6.718l-.001 2.878h9.184v25.216H0V9.69h8.994V6.81c0-3.626 2.756-6.586 6.188-6.713zm14.113 11.102H1.505v22.205h28.02V11.196zM15.43 1.562c-2.747 0-4.968 2.352-4.968 5.25V9.69h9.935V6.812c0-2.824-2.125-5.13-4.758-5.246z"></path>{' '}
            </svg>
        </div>
    );
};
