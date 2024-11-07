import { useEffect, useMemo, useState } from 'react';
import { Member, useEcomApi } from '../ecom';

export function useUserInfo() {
    const api = useEcomApi();

    const [user, setUser] = useState<Member>();

    const isLoggedIn = useMemo(() => api.isLoggedIn(), [api]);

    useEffect(() => {
        if (api.isLoggedIn()) {
            api.getUser().then(setUser);
        }
    }, [api]);

    return { user, isLoggedIn };
}
