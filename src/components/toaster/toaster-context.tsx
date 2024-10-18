import { createContext, useContext, useState } from 'react';

const TOAST_REMOVE_DELAY = 3000;

interface ToastData {
    type: string;
    message: string;
    duration?: number;
    isOpen: boolean;
    timeoutId: number;
}

export function ToasterContextProvider({ children }: React.PropsWithChildren) {
    const [toastData, setToastData] = useState<ToastData | null>(null);

    const toast = (toastData: { type: string; message: string; duration?: number }) => {
        setToastData({
            ...toastData,
            timeoutId: window.setTimeout(closeToast, toastData.duration ?? TOAST_REMOVE_DELAY),
            isOpen: true,
        });
    };

    const closeToast = () => {
        setToastData((toast) => {
            if (toast && toast.timeoutId) window.clearTimeout(toast.timeoutId);
            return null;
        });
    };

    const onOpenChange = () => (isOpen: boolean) => {
        setToastData((prevToastData) => (prevToastData ? { ...prevToastData, isOpen } : null));
    };

    const contextValue = { toastData, toast, closeToast, onOpenChange };
    return <ToasterContext.Provider value={contextValue}>{children}</ToasterContext.Provider>;
}

interface ToasterContextType {
    toastData: ToastData | null;
    toast: (toastData: { type: string; message: string; duration?: number }) => void;
    closeToast: () => void;
    onOpenChange: (isOpen: boolean) => void;
}

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToasterContext);
    if (!context) {
        throw new Error('useToast must be used within a ToasterContextProvider');
    }
    return context;
};
