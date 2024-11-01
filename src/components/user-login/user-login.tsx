import { useLocation, useNavigate } from '@remix-run/react';
import { useUserInfo } from '~/lib/hooks';
import { Avatar } from '../avatar/avatar';
import { DropdownMenu, DropdownMenuItem } from '../dropdown-menu/dropdown-menu';

import { ChevronDownIcon } from '../icons';
import styles from './user-login.module.scss';

export const UserLogin = () => {
    const { isUserLoggedIn, user } = useUserInfo();

    const navigate = useNavigate();
    const location = useLocation();

    const handleLoginClick = () => {
        if (!isUserLoggedIn) {
            navigate(`/login?returnPath=${location.pathname}`);
        }
    };

    const handleLogoutClick = () => {
        if (isUserLoggedIn) {
            navigate(`/logout?returnPath=${location.pathname}`);
        }
    };

    const content = (
        <div className={styles.contentWrapper}>
            <Avatar imageSrc={user?.profile?.photo?.url} altText={user?.profile?.nickname || ''} />
            {isUserLoggedIn ? (
                <ChevronDownIcon width={10} height={10} />
            ) : (
                <span className={styles.actionLink}>Log In</span>
            )}
        </div>
    );

    return (
        <div className={styles.root} onClick={handleLoginClick}>
            {isUserLoggedIn ? (
                <DropdownMenu trigger={content}>
                    <DropdownMenuItem className={styles.actionLink} onClick={handleLogoutClick}>
                        Log out
                    </DropdownMenuItem>
                </DropdownMenu>
            ) : (
                content
            )}
        </div>
    );
};
