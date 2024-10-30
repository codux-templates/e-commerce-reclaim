import classNames from 'classnames';
import { Outlet, NavLink } from '@remix-run/react';

import styles from './route.module.scss';

export default function MembersAreaPage() {
    const menuItemClassName = ({ isActive }: { isActive: boolean }) => {
        return classNames(styles.menuItem, { [styles.active]: isActive });
    };

    return (
        <div className={styles.page}>
            <div className={styles.menu}>
                <NavLink to={'/members-area/my-account'} className={menuItemClassName}>
                    My Account
                </NavLink>
                <NavLink to={'/members-area/my-orders'} className={menuItemClassName}>
                    My Orders
                </NavLink>
            </div>
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    );
}
