
import {
    useEffect,
    useRef,
    useState,
    type ReactNode,
} from "react";

import {
    ToastContext,
    type Toast,
    type ToastType,
} from "./toast-context";

const TOAST_DURATION = 4000;

export function ToastProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const timersRef = useRef<Map<string, number>>(new Map());

    function showToast(message: string, type: ToastType) {
        const id = crypto.randomUUID();

        const newToast: Toast = {
            id,
            message,
            type,
        };

        setToasts((previous) => [...previous, newToast]);

        const timer = window.setTimeout(() => {
            setToasts((previous) =>
                previous.filter((toast) => toast.id !== id)
            );

            timersRef.current.delete(id);
        }, TOAST_DURATION);

        timersRef.current.set(id, timer);
    }

    function removeToast(id: string) {
        const timer = timersRef.current.get(id);

        if (timer !== undefined) {
            window.clearTimeout(timer);
            timersRef.current.delete(id);
        }

        setToasts((previous) =>
            previous.filter((toast) => toast.id !== id)
        );
    }

    useEffect(() => {
        const timers = timersRef.current;

        return () => {
            timers.forEach((timer) => {
                window.clearTimeout(timer);
            });

            timers.clear();
        };
    }, []);

    return (
        <ToastContext.Provider
            value={{ toasts, showToast, removeToast }}
        >
            {children}
        </ToastContext.Provider>
    );
}
