import { NavLink, useLocation, useNavigate } from '@remix-run/react';
import classNames from 'classnames';
import { useMemberInfo } from '~/lib/hooks';
import { Avatar } from '../avatar/avatar';
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '../dropdown-menu/dropdown-menu';
import { ChevronDownIcon } from '../icons';

import styles from './user-menu.module.scss';

export const UserMenu = () => {
    const { isLoggedIn, member } = useMemberInfo();

    const navigate = useNavigate();
    const location = useLocation();

    const handleRootClick = () => {
        if (!isLoggedIn) {
            navigate(`/login?returnPath=${location.pathname}`);
        }
    };

    const content = (
        <div className={styles.contentWrapper}>
            <Avatar imageSrc={member?.profile?.photo?.url} />
            {isLoggedIn ? (
                <ChevronDownIcon width={10} height={10} />
            ) : (
                <NavLink className={styles.link} to={`/login?returnPath=${location.pathname}`}>
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
                    <DropdownMenuItem className={styles.dropdownMenuItem}>
                        <NavLink className={getLinkClassName} to="/members-area/my-account">
                            My Account
                        </NavLink>
                    </DropdownMenuItem>

                    <DropdownMenuItem className={styles.dropdownMenuItem}>
                        <NavLink className={getLinkClassName} to="/members-area/my-orders">
                            My Orders
                        </NavLink>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className={styles.dropdownMenuItem}>
                        <NavLink
                            className={getLinkClassName}
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
