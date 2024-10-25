import { Tokens } from '@wix/sdk';
import React, { FC } from 'react';
import { SWRConfig } from 'swr';
import { initializeEcomApi } from './api';
import { EcomAPI } from './types';

export const EcomAPIContext = React.createContext<EcomAPI | null>(null);

export const useEcomAPI = (): EcomAPI => {
    const context = React.useContext(EcomAPIContext);
    if (!context) {
        throw new Error('useEcomAPI must be used within a EcomAPIContextProvider');
    }
    return context;
};

export interface EcomAPIContextProvider extends React.PropsWithChildren {
    tokens?: Tokens;
}

export const EcomAPIContextProvider: FC<EcomAPIContextProvider> = ({ tokens, children }) => {
    return (
        <SWRConfig
            value={{
                revalidateIfStale: false,
                revalidateOnFocus: true,
                revalidateOnReconnect: true,
                refreshInterval: 5 * 60_000, // 5 minutes
                keepPreviousData: true,
            }}
        >
            <EcomAPIContext.Provider value={initializeEcomApi(tokens).api}>
                {children}
            </EcomAPIContext.Provider>
        </SWRConfig>
    );
};
