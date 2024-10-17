import { createContext, useContext, useState } from 'react';

const TOAST_REMOVE_DELAY = 3000;

export enum ToastType {
    Success = 'success',
    Error = 'error',
    Warning = 'warning',
    Info = 'info',
}

interface ToastData {
    type: ToastType;
    message: string;
    isOpen: boolean;
    timeout: ReturnType<typeof setTimeout>;
    origin?: string;
}

export function ToasterContextProvider({ children }: React.PropsWithChildren) {
    const [toast, setToast] = useState<ToastData | null>(null);

    const runToast = (toastData: { type: ToastType; message: string; origin?: string }) => {
        setToast({
            ...toastData,
            timeout: setTimeout(closeToast, TOAST_REMOVE_DELAY),
            isOpen: true,
        });
    };

    const closeToast = () => {
        setToast((toast) => {
            if (toast && toast.timeout) clearTimeout(toast.timeout);
            return null;
        });
    };

    const onOpenChange = () => (isOpen: boolean) => {
        setToast((prevToast) => (prevToast ? { ...prevToast, isOpen } : null));
    };

    const providerValue = { toast, runToast, closeToast, onOpenChange };
    return <ToasterContext.Provider value={providerValue}>{children}</ToasterContext.Provider>;
}

interface ToasterContextType {
    toast: ToastData | null;
    runToast: (toastData: { type: ToastType; message: string; duration?: number }) => void;
    closeToast: () => void;
    onOpenChange: (isOpen: boolean) => void;
}

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

export const useToaster = () => {
    const context = useContext(ToasterContext);
    if (!context) {
        throw new Error('useToaster must be used within a ToasterContextProvider');
    }
    return context;
};
