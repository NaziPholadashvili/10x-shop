
import { useToast } from "../context/useToast";

export default function ToastContainer() {
    const { toasts, removeToast } = useToast();

    if (toasts.length === 0) {
        return null;
    }

    return (
        <div
            className="fixed right-4 top-4 z-50 flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3"
            aria-label="Notifications"
        >
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    role={toast.type === "error" ? "alert" : "status"}
                    className={`flex items-start justify-between gap-3 rounded-lg border p-4 shadow-lg ${toast.type === "success"
                            ? "border-green-200 bg-green-50 text-green-800"
                            : "border-red-200 bg-red-50 text-red-800"
                        }`}
                >
                    <p className="text-sm font-medium">
                        {toast.message}
                    </p>

                    <button
                        type="button"
                        onClick={() => removeToast(toast.id)}
                        aria-label="Close notification"
                        className="shrink-0 rounded p-1 hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
            ))}
        </div>
    );
}
