import { useCallback, useEffect, useState } from 'react';
import type { NavigateOptions } from 'react-router';
import { useNavigation, useSearchParams } from '@remix-run/react';
import { mergeUrlSearchParams } from './index';

export interface SearchParamsStateConverter<S> {
    fromSearchParams: (params: URLSearchParams) => S;
    toSearchParams: (state: S) => URLSearchParams;
}

export function useSearchParamsState<S>(
    converter: SearchParamsStateConverter<S>,
    navigateOptions: NavigateOptions = { preventScrollReset: true },
) {
    const navigation = useNavigation();
    const [searchParams, setSearchParams] = useSearchParams();

    // Allows updating the UI optimistically
    // while Remix navigates to the URL with updated parameters.
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
