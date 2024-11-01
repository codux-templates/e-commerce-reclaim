import { NavLink, useLocation, useNavigate } from '@remix-run/react';
import classNames from 'classnames';
import { useUserInfo } from '~/lib/hooks';
import { Avatar } from '../avatar/avatar';
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '../dropdown-menu/dropdown-menu';
import { ChevronDownIcon } from '../icons';

import styles from './user-menu.module.scss';

export const UserMenu = () => {
    const { isLoggedIn, user } = useUserInfo();

    const navigate = useNavigate();
    const location = useLocation();

    const handleRootClick = () => {
        if (!isLoggedIn) {
            navigate(`/login?returnPath=${location.pathname}`);
        }
    };

    const content = (
        <div className={styles.contentWrapper}>
            <Avatar imageSrc={user?.profile?.photo?.url} altText={user?.profile?.nickname || ''} />
            {isLoggedIn ? (
                <ChevronDownIcon width={10} height={10} />
            ) : (
                <span className={styles.actionLink}>Log In</span>
            )}
        </div>
    );

    const menuItemStyle = ({ isActive }: { isActive: boolean }) =>
        classNames(styles.menuLink, {
            [styles.active]: isActive,
        });

    return (
        <div className={styles.root} onClick={handleRootClick}>
            {isLoggedIn ? (
                <DropdownMenu trigger={content} contentClassName={styles.dropDownContent}>
                    <DropdownMenuItem className={styles.menuItem}>
                        <NavLink className={menuItemStyle} to="/members-area/my-account">
                            My Account
                        </NavLink>
                    </DropdownMenuItem>

                    <DropdownMenuItem className={styles.menuItem}>
                        <NavLink className={menuItemStyle} to="/members-area/my-orders">
                            My Orders
                        </NavLink>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className={styles.menuItem}>
                        <NavLink
                            className={styles.menuLink}
                            to={`/logout?returnPath=${location.pathname}`}
                        >
                            Log out
                        </NavLink>
                    </DropdownMenuItem>
                </DropdownMenu>
            ) : (
                content
            )}
        </div>
    );
};
