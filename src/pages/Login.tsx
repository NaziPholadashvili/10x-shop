
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { login } = useAuth();
    const navigate = useNavigate();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!username.trim() || !password.trim()) {
            setError("Username and password are required.");
            return;
        }

        setError("");
        login(username.trim());
        navigate("/");
    }

    return (
        <main className="mx-auto max-w-md px-6 py-12">
            <h1 className="mb-8 text-3xl font-bold text-slate-900">
                Login
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-xl bg-white p-6 shadow-sm"
            >
                <div>
                    <label htmlFor="username" className="mb-2 block font-medium">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        required
                        className="w-full rounded-lg border border-slate-300 p-3"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="mb-2 block font-medium">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                        className="w-full rounded-lg border border-slate-300 p-3"
                    />
                </div>

                {error && (
                    <p role="alert" className="text-sm text-red-600">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-700"
                >
                    Login
                </button>
            </form>
        </main>
    );
}
