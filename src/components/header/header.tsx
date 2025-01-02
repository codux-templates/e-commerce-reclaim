import { Link, useNavigate } from '@remix-run/react';
import classNames from 'classnames';
import { CartIcon } from '~/src/components/icons';
import { getCartItemCount, useCartData, useCartOpen } from '~/src/wix/cart';
import { SearchInput } from '../search-input/search-input';
import { UserMenu } from '../user-menu/user-menu';

import styles from './header.module.scss';
import { Menu } from '../menu/menu';

export interface HeaderProps {
    className?: string;
}

export const Header = ({ className }: HeaderProps) => {
    const cart = useCartData();
    const cartOpener = useCartOpen();
    const navigate = useNavigate();

    const onSearchSubmit = (search: string) => {
        navigate(`/products/all-products?search=${encodeURIComponent(search)}`);
    };

    const cartItemCount = cart.data ? getCartItemCount(cart.data) : 0;

    return (
        <header className={classNames(styles.root, className)}>
            <section className={styles.topBar}>
                <Link to="/" className={styles.logo}>
                    ReClaim
                </Link>
                <div>
                    <div className={styles.advertisingText}>
                        Free shipping on all intl. orders over $35
                    </div>
                    <Link className={styles.shopNow} to="/products/all-products">
                        Shop Now
                    </Link>
                </div>
            </section>
            <section className={styles.navigation}>
                <SearchInput className={styles.searchInput} onSearchSubmit={onSearchSubmit} />
                <Menu className={styles.menu} />
                <div className={styles.actions}>
                    <UserMenu />
                    <button
                        className={classNames(styles.cartButton, 'iconButton')}
                        onClick={() => cartOpener.setIsOpen(true)}
                    >
                        <CartIcon className={styles.cart} count={cartItemCount} />
                    </button>
                </div>
            </section>
        </header>
    );
};
