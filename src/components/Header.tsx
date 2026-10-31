
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useCart } from "../context/useCart";

export default function Header() {
    const { username, isAuthenticated, logout } = useAuth();
    const { totalItems } = useCart();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
                <Link
                    to="/"
                    className="text-2xl font-extrabold tracking-tight text-indigo-600"
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
                        className={({ isActive }) =>
                            isActive
                                ? "font-semibold text-indigo-600"
                                : "text-slate-600 hover:text-indigo-600"
                        }
                    >
                        Catalog
                    </NavLink>

                    <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                            isActive
                                ? "font-semibold text-indigo-600"
                                : "text-slate-600 hover:text-indigo-600"
                        }
                    >
                        <span className="inline-flex items-center gap-2">
                            Cart
                            <span
                                aria-label={`${totalItems} items in cart`}
                                className="inline-flex min-w-6 items-center justify-center rounded-full bg-indigo-600 px-1.5 py-0.5 text-xs font-semibold text-white"
                            >
                                {totalItems}
                            </span>
                        </span>
                    </NavLink>

                    {isAuthenticated ? (
                        <>
                            <NavLink
                                to="/orders"
                                className={({ isActive }) =>
                                    isActive
                                        ? "font-semibold text-indigo-600"
                                        : "text-slate-600 hover:text-indigo-600"
                                }
                            >
                                My Orders
                            </NavLink>

                            <NavLink
                                to="/profile"
                                className={({ isActive }) =>
                                    isActive
                                        ? "font-semibold text-indigo-600"
                                        : "text-slate-600 hover:text-indigo-600"
                                }
                            >
                                My Profile
                            </NavLink>

                            <span className="font-medium text-slate-700">
                                Hello, {username}
                            </span>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <NavLink
                            to="/login"
                            className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
                        >
                            Login
                        </NavLink>
                    )}
                </nav>
            </div>
        </header>
    );
}
