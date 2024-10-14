import { useCallback, useEffect, useState } from 'react';
import type { NavigateOptions } from 'react-router';
import { useNavigation, useSearchParams } from '@remix-run/react';
import { mergeUrlSearchParams } from './index';

export interface SearchParamsStateConverter<S> {
    fromSearchParams: (params: URLSearchParams) => S;
    toSearchParams: (state: S) => URLSearchParams;
}

/**
 * Helper to manage the state that lives in URL search params.
 * Search params are not updated immediately
 * because changing them causes a Remix navigation and loaders reloading.
 * This hooks provides a local React state to apply changes to URL optimistically
 * and ensures it's up to date with the values in URL.
 *
 * @param converter Converts specific state from search params and vice versa.
 * @param navigateOptions Router navigation options when changing search params.
 */
export function useSearchParamsState<S>(
    converter: SearchParamsStateConverter<S>,
    navigateOptions: NavigateOptions = { preventScrollReset: true },
) {
    const navigation = useNavigation();
    const [searchParams, setSearchParams] = useSearchParams();

    const [state, setState] = useState(() => converter.fromSearchParams(searchParams));

    const handleChange = useCallback(
        (newState: S) => {
            setState(newState);
            setSearchParams((prevParams) => {
                return mergeUrlSearchParams(prevParams, converter.toSearchParams(newState));
            }, navigateOptions);
        },
        [setSearchParams, converter, navigateOptions],
    );

    // Synchronize local state with URL search params on back/forward browser button clicks.
    useEffect(() => {
        if (navigation.state !== 'loading') {
            setState(converter.fromSearchParams(searchParams));
        }
    }, [navigation.state, searchParams, converter]);

    return [state, handleChange] as const;
}
