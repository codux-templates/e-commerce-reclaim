import { Link, useNavigate } from '@remix-run/react';
import classNames from 'classnames';
import { ROUTES } from '~/router/config';
import commonStyles from '~/styles/common-styles.module.scss';
import styles from './header.module.scss';
import { CartIcon } from '../cart-icon/cart-icon';
import loginIcon from '~/assets/svg/user.svg';

export interface HeaderProps {
    className?: string;
}

export const Header = ({ className }: HeaderProps) => {
    const navigate = useNavigate();

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
                    className={classNames(styles.shopNowButton, commonStyles.introButton)}
                    onClick={() => navigate(ROUTES.products.to('all-products'))}
                >
                    Shop Now
                </button>
            </section>
            <section className={styles.navigation}>
                <div className={styles.empty} />
                <nav className={styles.menu}>
                    <Link to={ROUTES.products.to('all-products')} className={styles.menuItem}>
                        Shop All
                    </Link>
                    <Link to={ROUTES.products.to('kitchen-essentials')} className={styles.menuItem}>
                        Kitchen
                    </Link>
                    <Link to={ROUTES.products.to('bath')} className={styles.menuItem}>
                        Bath
                    </Link>
                    <Link to={ROUTES.products.to('on-the-go')} className={styles.menuItem}>
                        On the Go
                    </Link>
                    <Link to={ROUTES.aboutUs.to()} className={styles.menuItem}>
                        About Us
                    </Link>
                </nav>
                <div className={styles.actions}>
                    <Link to={'ROUTES.login.to()'} className={styles.logInLink}>
                        <img className={styles.loginIcon} src={loginIcon} alt="loginIcon" />
                        <span>Log In</span>
                    </Link>
                    <CartIcon className={styles.cart}>0</CartIcon>
                </div>
            </section>
        </header>
    );
};
