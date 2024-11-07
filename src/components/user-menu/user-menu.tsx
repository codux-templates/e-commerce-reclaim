import { NavLink, useNavigate } from '@remix-run/react';
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

    const handleRootClick = () => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    };

    const content = (
        <button className={styles.content}>
            <Avatar imageSrc={member?.profile?.photo?.url} />
            {isLoggedIn ? (
                <ChevronDownIcon width={10} height={10} />
            ) : (
                <NavLink className={styles.link} to={'/login'}>
                    Log In
                </NavLink>
            )}
        </button>
    );

    return (
        <div className={styles.root} onClick={handleRootClick}>
            {isLoggedIn ? (
                <DropdownMenu
                    trigger={content}
                    contentProps={{
                        align: 'end',
                    }}
                >
                    <DropdownMenuItem asChild>
                        <NavLink className={styles.link} to={'/members-area/my-account'}>
                            My Account
                        </NavLink>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <NavLink className={styles.link} to={'/members-area/my-orders'}>
                            My Orders
                        </NavLink>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem asChild>
                        <NavLink className={styles.link} to={'/logout'}>
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
