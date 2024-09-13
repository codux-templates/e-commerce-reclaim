import { Link, NavLink } from '@remix-run/react';
import styles from './footer.module.scss';
import classNames from 'classnames';
import { ROUTES } from '~/router/config';

export interface FooterProps {
    className?: string;
}

export const Footer = ({ className }: FooterProps) => {
    const navItemStyle = ({ isActive }: { isActive: boolean }) =>
        classNames(styles.navItem, {
            [styles.active]: isActive,
        });

    return (
        <footer className={classNames(styles.root, className)}>
            <section className={styles.navigation}>
                <nav className={styles.column}>
                    <ul>
                        <li>
                            <NavLink
                                to={ROUTES.products.to('all-products')}
                                className={navItemStyle}
                            >
                                Shop All
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={ROUTES.products.to('kitchen-essentials')}
                                className={navItemStyle}
                            >
                                Kitchen
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.products.to('bath')} className={navItemStyle}>
                                Bath
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.products.to('on-the-go')} className={navItemStyle}>
                                On the Go
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.products.to('new-in')} className={navItemStyle}>
                                New In
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={ROUTES.products.to('best-sellers')}
                                className={navItemStyle}
                            >
                                Best Sellers
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ROUTES.aboutUs.to()} className={navItemStyle}>
                                About Us
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className={styles.column}>
                    <NavLink to={ROUTES.termsAndConditions.to()} className={navItemStyle}>
                        Terms & Conditions
                    </NavLink>
                    <NavLink to={ROUTES.privacyPolicy.to()} className={navItemStyle}>
                        Privacy Policy
                    </NavLink>
                    <NavLink to={ROUTES.shippingPolicy.to()} className={navItemStyle}>
                        Shipping Policy
                    </NavLink>
                    <NavLink to={ROUTES.refundPolicy.to()} className={navItemStyle}>
                        Refund Policy
                    </NavLink>
                </div>
                <div className={styles.column}>
                    <Link to={ROUTES.home.to()} className={styles.navItem}>
                        Facebook
                    </Link>
                    <Link to={ROUTES.home.to()} className={styles.navItem}>
                        Instagram
                    </Link>
                    <Link to={ROUTES.home.to()} className={styles.navItem}>
                        Pinterest
                    </Link>
                </div>
            </section>
            <section className={styles.bottomBar}>
                <div className={styles.logo}>
                    <Link to={ROUTES.home.to()}>ReClaim</Link>
                </div>
                <div className={styles.copyright}>
                    © 2035 by ReClaim. Made with{' '}
                    <Link to="https://www.codux.com/" className={styles.coduxLink}>
                        Codux™
                    </Link>
                </div>
            </section>
        </footer>
    );
};
