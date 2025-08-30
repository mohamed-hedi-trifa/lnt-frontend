// ToastContext.tsx
import React from 'react';
import { createContext, useContext, useState } from 'react';

type Toast = { type: 'success' | 'error'; message: string };

const ToastContext = createContext({
    showToast: (toast: Toast) => { },
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<Toast | null>(null);

    const showToast = (toast: Toast) => {
        setToast(toast);
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <div className={`fixed top-5 right-5 z-50 px-4 py-2 rounded shadow text-white transition-all
          ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {toast.message}
                </div>
            )}
        </ToastContext.Provider>
    );
};
