import { useEffect, useMemo, useState } from 'react';
import { Member, useEcomAPI } from '../ecom';

export function useUserInfo() {
    const api = useEcomAPI();

    const [user, setUser] = useState<Member>();

    const isUserLoggedIn = useMemo(() => api.isUserLoggedIn(), [api]);

    useEffect(() => {
        if (api.isUserLoggedIn()) {
            api.getUser().then((u) => setUser(u));
        }
    }, [api]);

    return { user, isUserLoggedIn };
}
