import { Link, NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
                <Link
                    to="/"
                    className="text-2xl font-extrabold tracking-tight text-indigo-600"
                >
                    10X Shop
                </Link>

                <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-5">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? "font-semibold text-indigo-600"
                                : "text-slate-600 hover:text-indigo-600"
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/products"
                        className={({ isActive }) =>
                            isActive
                                ? "font-semibold text-indigo-600"
                                : "text-slate-600 hover:text-indigo-600"
                        }
                    >
                        Products
                    </NavLink>

                    <NavLink
                        to="/cart"
                        className={({ isActive }) =>
                            isActive
                                ? "font-semibold text-indigo-600"
                                : "text-slate-600 hover:text-indigo-600"
                        }
                    >
                        Cart
                    </NavLink>

                    <NavLink
                        to="/login"
                        className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
                    >
                        Login
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}