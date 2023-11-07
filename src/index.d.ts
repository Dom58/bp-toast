import './classicToast.css';
import React from 'react';
type ToastPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-center' | 'bottom-right' | 'bottom-left' | 'center';
interface ToastOptions {
    message: string;
    subtitle?: string;
    position?: ToastPosition;
    icon?: string | HTMLImageElement | React.ReactNode;
    timeout?: number;
    customClass?: string;
    iconClass?: string | string[];
    messageClass?: string | string[];
    subtitleClass?: string | string[];
    customStyle?: React.CSSProperties;
    closeButton?: React.ReactNode | string | HTMLImageElement | null;
}
declare const classicToast: {
    success: (options: ToastOptions) => void;
    warning: (options: ToastOptions) => void;
    error: (options: ToastOptions) => void;
};
export default classicToast;
