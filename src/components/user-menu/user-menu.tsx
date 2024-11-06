import { NavLink, useLocation, useNavigate } from '@remix-run/react';
import classNames from 'classnames';
import { useMemo } from 'react';
import { useMemberInfo } from '~/lib/hooks';
import { Avatar } from '../avatar/avatar';
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '../dropdown-menu/dropdown-menu';
import { ChevronDownIcon } from '../icons';

import styles from './user-menu.module.scss';

const myAccountPageRoute = '/members-area/my-account';
const myOrdersPageRoute = '/members-area/my-orders';

export const UserMenu = () => {
    const { isLoggedIn, member } = useMemberInfo();

    const navigate = useNavigate();
    const location = useLocation();

    const loginRoute = useMemo(() => `/login?returnPath=${location.pathname}`, [location.pathname]);
    const logoutRoute = useMemo(
        () => `/logout?returnPath=${location.pathname}`,
        [location.pathname],
    );

    const navigateToMyAccount = () => navigate(myAccountPageRoute);
    const navigateToMyOrders = () => navigate(myOrdersPageRoute);
    const navigateToLogin = () => navigate(loginRoute);
    const navigateToLogout = () => navigate(logoutRoute);

    const handleRootClick = () => {
        if (!isLoggedIn) {
            navigateToLogin();
        }
    };

    const content = (
        <div className={styles.contentWrapper}>
            <Avatar imageSrc={member?.profile?.photo?.url} />
            {isLoggedIn ? (
                <ChevronDownIcon width={10} height={10} />
            ) : (
                <NavLink className={styles.link} to={loginRoute}>
                    Log In
                </NavLink>
            )}
        </div>
    );

    const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
        classNames(styles.link, {
            [styles.active]: isActive,
        });

    return (
        <div className={styles.root} onClick={handleRootClick}>
            {isLoggedIn ? (
                <DropdownMenu
                    trigger={content}
                    contentProps={{
                        className: styles.dropdownMenu,
                    }}
                >
                    <DropdownMenuItem
                        className={styles.dropdownMenuItem}
                        onSelect={navigateToMyAccount}
                    >
                        <NavLink className={getLinkClassName} to={myAccountPageRoute}>
                            My Account
                        </NavLink>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className={styles.dropdownMenuItem}
                        onSelect={navigateToMyOrders}
                    >
                        <NavLink className={getLinkClassName} to={myOrdersPageRoute}>
                            My Orders
                        </NavLink>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        className={styles.dropdownMenuItem}
                        onSelect={navigateToLogout}
                    >
                        <NavLink className={getLinkClassName} to={logoutRoute}>
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
