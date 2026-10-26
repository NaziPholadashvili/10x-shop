
import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    state: ErrorBoundaryState = {
        hasError: false,
    };

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        if (import.meta.env.DEV) {
            console.error("ErrorBoundary caught an error:", error, info);
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
                    <h1 className="text-2xl font-bold">
                        Something went wrong
                    </h1>

                    <p className="text-gray-600">
                        An unexpected error occurred. Please try again.
                    </p>

                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                        Reload page
                    </button>
                </main>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
