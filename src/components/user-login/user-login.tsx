import { useLocation, useNavigate } from '@remix-run/react';
import classNames from 'classnames';
import { useUserInfo } from '~/lib/hooks';
import { Avatar } from '../avatar/avatar';
import { Select, SelectItem } from '../select/select';

import styles from './user-login.module.scss';

enum LoginMenuAction {
    initial = '',
    logout = 'logout',
}

export const UserLogin = () => {
    const { isUserLoggedIn, user } = useUserInfo();

    const navigate = useNavigate();
    const location = useLocation();

    const handleLoginClick = () => {
        navigate(`/login?returnPath=${location.pathname}`);
    };

    const handleAction = (value: LoginMenuAction) => {
        if (value === LoginMenuAction.logout) {
            navigate(`/logout?returnPath=${location.pathname}`);
        }
    };

    const avatar = (
        <Avatar imageSrc={user?.profile?.photo?.url} altText={user?.profile?.nickname || ''} />
    );

    return (
        <div className={styles.root} onClick={handleLoginClick}>
            {isUserLoggedIn ? (
                <Select
                    className={styles.select}
                    dropdownClassName={styles.dropdown}
                    value={LoginMenuAction.initial}
                    onValueChange={handleAction}
                    placeholder={avatar}
                    renderValue={() => avatar}
                >
                    <SelectItem
                        className={classNames(styles.selectItem, styles.actionLink)}
                        value={LoginMenuAction.logout}
                    >
                        Log out
                    </SelectItem>
                </Select>
            ) : (
                <>
                    {avatar}
                    <span className={styles.actionLink}>Log In</span>
                </>
            )}
        </div>
    );
};
