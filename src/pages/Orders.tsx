import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useOrders } from "../context/useOrders";
import { getOrderStatus } from "../utils/orderStatus";
import { formatPrice } from "../utils/price";

export default function Orders() {
    const { username } = useAuth();
    const { orders } = useOrders();

    const [currentTime, setCurrentTime] = useState(() => Date.now());

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setCurrentTime(Date.now());
        }, 30_000);

        return () => {
            window.clearInterval(intervalId);
        };
    }, []);

    const userOrders = orders
        .filter((order) => order.userId === username)
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        );

    return (
        <main className="mx-auto max-w-4xl px-6 py-12">
            <h1 className="mb-8 text-3xl font-bold text-slate-900 dark:text-slate-100">
                My Orders
            </h1>

            {userOrders.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
                    <p className="mb-6 text-slate-600 dark:text-slate-300">
                        You have no orders yet.
                    </p>

                    <Link
                        to="/products"
                        className="inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
                    >
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {userOrders.map((order) => {
                        const status = getOrderStatus(
                            order.createdAt,
                            currentTime
                        );

                        const statusClasses =
                            status === "Delivered"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                                : status === "Shipped"
                                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300";

                        return (
                            <section
                                key={order.id}
                                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
                            >
                                <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                                    <div>
                                        <h2 className="font-semibold text-slate-900 dark:text-slate-100">
                                            Order #
                                            {order.number ??
                                                order.id.slice(0, 8)}
                                        </h2>

                                        <p className="text-sm text-slate-500 dark:text-slate-400">
                                            {new Date(
                                                order.createdAt
                                            ).toLocaleString()}
                                        </p>
                                    </div>

                                    <span
                                        className={`rounded-full px-3 py-1 text-sm font-medium ${statusClasses}`}
                                    >
                                        {status}
                                    </span>
                                </div>

                                <ul className="space-y-3 border-t border-slate-200 py-4 dark:border-slate-700">
                                    {order.items.map((item) => {
                                        const unitPrice =
                                            item.unitPrice ??
                                            item.product.price;

                                        const lineTotal =
                                            Math.round(
                                                (
                                                    unitPrice *
                                                    item.quantity +
                                                    Number.EPSILON
                                                ) * 100
                                            ) / 100;

                                        return (
                                            <li
                                                key={item.product.id}
                                                className="flex justify-between gap-4"
                                            >
                                                <span className="text-slate-700 dark:text-slate-200">
                                                    {item.product.title} ×{" "}
                                                    {item.quantity}
                                                </span>

                                                <span className="font-medium text-slate-900 dark:text-slate-100">
                                                    {formatPrice(lineTotal)}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>

                                <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        Total items: {order.totalItems}
                                    </p>

                                    <p className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-100">
                                        Total:{" "}
                                        {formatPrice(order.totalPrice)}
                                    </p>

                                    <Link
                                        to={`/orders/${order.id}`}
                                        className="mt-4 inline-block rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </section>
                        );
                    })}
                </div>
            )}
        </main>
    );
}