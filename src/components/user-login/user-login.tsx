import { NavLink, useNavigate } from '@remix-run/react';
import { useUserInfo } from '~/lib/hooks';
import { Avatar } from '../avatar/avatar';

import styles from './user-login.module.scss';

export const UserLogin = () => {
    const { isUserLoggedIn, user } = useUserInfo();

    const navigate = useNavigate();

    return (
        <div className={styles.root} onClick={() => navigate('/login')}>
            <Avatar imageSrc={user?.profile?.photo?.url} altText={user?.profile?.nickname || ''} />

            {isUserLoggedIn ? (
                <NavLink to={'/logout'}>LOGOUT</NavLink>
            ) : (
                <span className={styles.loginText}>Log In</span>
            )}
        </div>
    );
};
