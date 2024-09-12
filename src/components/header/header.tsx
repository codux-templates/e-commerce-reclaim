import { Link, NavLink, useNavigate } from '@remix-run/react';
import classNames from 'classnames';
import { ROUTES } from '~/router/config';
import styles from './header.module.scss';
import { CartIcon } from '../cart-icon/cart-icon';
import loginIcon from '~/assets/svg/user.svg';

export interface HeaderProps {
    className?: string;
}

export const Header = ({ className }: HeaderProps) => {
    const navigate = useNavigate();

    const menuItemStyle = ({ isActive }: { isActive: boolean }) =>
        classNames(styles.menuItem, {
            [styles.active]: isActive,
        });

    return (
        <header className={classNames(styles.root, className)}>
            <section className={styles.topBar}>
                <Link to={ROUTES.home.to()} className={styles.logo}>
                    ReClaim
                </Link>
                <div className={styles.advertisingText}>
                    Free shipping on all intl. orders over $35
                </div>
                <button
                    className={styles.shopNowButton}
                    onClick={() => navigate(ROUTES.products.to('all-products'))}
                >
                    Shop Now
                </button>
            </section>
            <section className={styles.navigation}>
                <div className={styles.empty} />
                <nav className={styles.menu}>
                    <NavLink to={ROUTES.products.to('all-products')} className={menuItemStyle}>
                        Shop All
                    </NavLink>
                    <NavLink
                        to={ROUTES.products.to('kitchen-essentials')}
                        className={menuItemStyle}
                    >
                        Kitchen
                    </NavLink>
                    <NavLink to={ROUTES.products.to('bath')} className={menuItemStyle}>
                        Bath
                    </NavLink>
                    <NavLink to={ROUTES.products.to('on-the-go')} className={menuItemStyle}>
                        On the Go
                    </NavLink>
                    <NavLink to={ROUTES.aboutUs.to()} className={menuItemStyle}>
                        About Us
                    </NavLink>
                </nav>
                <div className={styles.actions}>
                    <Link to={'ROUTES.login.to()'} className={styles.logInLink}>
                        <img className={styles.loginIcon} src={loginIcon} alt="loginIcon" />
                        <span>Log In</span>
                    </Link>
                    <CartIcon className={styles.cart} count={0} />
                </div>
            </section>
        </header>
    );
};
