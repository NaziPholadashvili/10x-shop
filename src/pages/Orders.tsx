
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrdersContext";

export default function Orders() {
    const { username } = useAuth();
    const { orders } = useOrders();

    const userOrders = orders
        .filter((order) => order.userId === username)
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        );

    return (
        <main className="mx-auto max-w-4xl px-6 py-12">
            <h1 className="mb-8 text-3xl font-bold text-slate-900">
                My Orders
            </h1>

            {userOrders.length === 0 ? (
                <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                    <p className="mb-6 text-slate-600">
                        You have not placed any orders yet.
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
                    {userOrders.map((order) => (
                        <section
                            key={order.id}
                            className="rounded-xl bg-white p-6 shadow-sm"
                        >
                            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <h2 className="font-semibold text-slate-900">
                                        Order #{order.id.slice(0, 8)}
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleString()}
                                    </p>
                                </div>

                                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                                    {order.status}
                                </span>
                            </div>

                            <ul className="space-y-3 border-t py-4">
                                {order.items.map((item) => (
                                    <li
                                        key={item.product.id}
                                        className="flex justify-between gap-4"
                                    >
                                        <span>
                                            {item.product.title} ×{" "}
                                            {item.quantity}
                                        </span>

                                        <span className="font-medium">
                                            $
                                            {(
                                                item.product.price *
                                                item.quantity
                                            ).toFixed(2)}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <div className="border-t pt-4">
                                <p className="text-sm text-slate-600">
                                    Total items: {order.totalItems}
                                </p>

                                <p className="mt-2 text-xl font-bold text-slate-900">
                                    Total: ${order.totalPrice.toFixed(2)}
                                </p>
                            </div>
                        </section>
                    ))}
                </div>
            )}
        </main>
    );
}
