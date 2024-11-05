import { useEffect, useMemo, useState } from 'react';
import { Member, useEcomApi } from '../ecom';

export function useMemberInfo() {
    const api = useEcomApi();

    const [member, setMember] = useState<Member>();

    const isLoggedIn = useMemo(() => api.isUserLoggedIn(), [api]);

    useEffect(() => {
        if (api.isUserLoggedIn()) {
            api.getUser().then((u) => setMember(u));
        }
    }, [api]);

    return { member, isLoggedIn };
}
