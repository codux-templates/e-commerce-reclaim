import { useNavigation } from '@remix-run/react';
import { useCallback, useEffect, useState } from 'react';

/**
 * Allows updating the UI optimistically while Remix navigates to the URL with updated parameters.
 */
export function useOptimisticSearchParamsState<S>(
    stateFromSearchParams: S,
    setStateToSearchParams: (state: S) => void,
) {
    const navigation = useNavigation();

    const [state, setState] = useState(stateFromSearchParams);

    const handleChange = useCallback(
        (state: S) => {
            setState(state);
            setStateToSearchParams(state);
        },
        [setStateToSearchParams],
    );

    // Synchronize local state with URL search params on back/forward browser button clicks.
    useEffect(() => {
        if (navigation.state !== 'loading') {
            setState(stateFromSearchParams);
        }
    }, [stateFromSearchParams, navigation.state]);

    return [state, handleChange] as const;
}
