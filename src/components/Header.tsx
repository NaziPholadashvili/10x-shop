
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useCart } from "../context/useCart";
import { useTheme } from "../context/useTheme";

export default function Header() {
    const { username, isAuthenticated, logout } = useAuth();
    const { totalItems } = useCart();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/");
    }

    const navigationClassName = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? "font-semibold text-indigo-600 dark:text-indigo-400"
            : "text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400";

    return (
        <header className="border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
                <Link
                    to="/"
                    className="text-2xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400"
                >
                    10X Shop
                </Link>

                <nav
                    aria-label="Main navigation"
                    className="flex flex-wrap items-center gap-5"
                >
                    <NavLink
                        to="/"
                        end
                        className={navigationClassName}
                    >
                        Catalog
                    </NavLink>

                    <NavLink
                        to="/cart"
                        className={navigationClassName}
                    >
                        <span className="inline-flex items-center gap-2">
                            Cart

                            {totalItems > 0 && (
                                <span
                                    aria-label={`${totalItems} items in cart`}
                                    className="inline-flex min-w-6 items-center justify-center rounded-full bg-indigo-600 px-1.5 py-0.5 text-xs font-semibold text-white"
                                >
                                    {totalItems}
                                </span>
                            )}
                        </span>
                    </NavLink>

                    {isAuthenticated ? (
                        <>
                            <NavLink
                                to="/orders"
                                className={navigationClassName}
                            >
                                My Orders
                            </NavLink>

                            <NavLink
                                to="/profile"
                                className={navigationClassName}
                            >
                                My Profile
                            </NavLink>

                            <span className="font-medium text-slate-700 dark:text-slate-200">
                                Hello, {username}
                            </span>
                        </>
                    ) : null}

                    <button
                        type="button"
                        onClick={toggleTheme}
                        aria-label={
                            theme === "light"
                                ? "Switch to dark mode"
                                : "Switch to light mode"
                        }
                        aria-pressed={theme === "dark"}
                        className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                    >
                        {theme === "light"
                            ? "🌙 Dark Mode"
                            : "☀️ Light Mode"}
                    </button>

                    {isAuthenticated ? (
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
                        >
                            Log out
                        </button>
                    ) : (
                        <NavLink
                            to="/login"
                            className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
                        >
                            Log in
                        </NavLink>
                    )}
                </nav>
            </div>
        </header>
    );
}
