import { createContext, useContext, useState } from 'react';

const TOAST_REMOVE_DELAY = 3000;
type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastData {
    type: string;
    message: ToastType;
    isOpen: boolean;
    timeoutId: number;
}

export function ToasterContextProvider({ children }: React.PropsWithChildren) {
    const [toastData, setToastData] = useState<ToastData | null>(null);

    const toast = ({
        type,
        message,
        duration,
    }: {
        type: string;
        message: ToastType;
        duration?: number;
    }) => {
        setToastData({
            type,
            message,
            timeoutId: window.setTimeout(closeToast, duration ?? TOAST_REMOVE_DELAY),
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
    toast: (toastData: { type: string; message: ToastType; duration?: number }) => void;
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
