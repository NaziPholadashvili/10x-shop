
import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

type LoginFormErrors = {
    username?: string;
    password?: string;
};

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<LoginFormErrors>({});

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from =
        location.state?.from === "/checkout"
            ? "/checkout"
            : "/";

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const newErrors: LoginFormErrors = {};

        if (!username.trim()) {
            newErrors.username = "Username is required";
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password =
                "Password must be at least 6 characters";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        login(username.trim());
        navigate(from, { replace: true });
    }

    return (
        <main className="mx-auto max-w-md px-6 py-12">
            <Link
                to="/"
                className="mb-6 inline-block text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
                ← Back to catalog
            </Link>

            <h1 className="mb-8 text-3xl font-bold text-slate-900 dark:text-white">
                Log in
            </h1>

            <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
                <div>
                    <label
                        htmlFor="username"
                        className="mb-2 block font-medium text-slate-700 dark:text-slate-200"
                    >
                        Username
                    </label>

                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(event) => {
                            setUsername(event.target.value);
                            setErrors((prev) => ({
                                ...prev,
                                username: undefined,
                            }));
                        }}
                        required
                        aria-invalid={Boolean(errors.username)}
                        aria-describedby={
                            errors.username
                                ? "username-error"
                                : undefined
                        }
                        className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                    />

                    {errors.username && (
                        <p
                            id="username-error"
                            role="alert"
                            className="mt-1 text-sm text-red-600 dark:text-red-400"
                        >
                            {errors.username}
                        </p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="mb-2 block font-medium text-slate-700 dark:text-slate-200"
                    >
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value);
                            setErrors((prev) => ({
                                ...prev,
                                password: undefined,
                            }));
                        }}
                        required
                        minLength={6}
                        aria-invalid={Boolean(errors.password)}
                        aria-describedby={
                            errors.password
                                ? "password-error"
                                : undefined
                        }
                        className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                    />

                    {errors.password && (
                        <p
                            id="password-error"
                            role="alert"
                            className="mt-1 text-sm text-red-600 dark:text-red-400"
                        >
                            {errors.password}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700"
                >
                    Log in
                </button>
            </form>
        </main>
    );
}
