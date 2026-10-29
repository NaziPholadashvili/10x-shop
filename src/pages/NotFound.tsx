
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <main className="mx-auto max-w-3xl px-6 py-20 text-center">
            <h1 className="mb-4 text-5xl font-bold text-indigo-600">
                404 — Page Not Found
            </h1>

            <p className="mb-8 text-lg text-slate-600">
                Sorry, the page you are looking for does not exist.
            </p>

            <Link
                to="/"
                className="inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Back to Home
            </Link>
        </main>
    );
}
