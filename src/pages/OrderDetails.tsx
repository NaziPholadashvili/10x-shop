
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useCart } from "../context/useCart";
import { useOrders } from "../context/useOrders";
import { getOrderStatus } from "../utils/orderStatus";
import type { OrderStatus } from "../types/order";

const statusSteps: OrderStatus[] = [
    "Processing",
    "Shipped",
    "Delivered",
];

export default function OrderDetails() {
    const { id } = useParams<{ id: string }>();
    const { username } = useAuth();
    const { orders } = useOrders();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const [currentTime, setCurrentTime] = useState(() => Date.now());

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setCurrentTime(Date.now());
        }, 30_000);

        return () => {
            window.clearInterval(intervalId);
        };
    }, []);

    const order = orders.find(
        (item) => item.id === id && item.userId === username
    );

    if (!order) {
        return (
            <main className="mx-auto max-w-4xl px-6 py-12">
                <h1 className="mb-4 text-3xl font-bold text-slate-900">
                    Order Not Found
                </h1>

                <p className="mb-6 text-slate-600">
                    This order does not exist or is not available
                    for your account.
                </p>

                <Link
                    to="/orders"
                    className="font-semibold text-indigo-600 hover:underline"
                >
                    Back to My Orders
                </Link>
            </main>
        );
    }

    const status = getOrderStatus(order.createdAt, currentTime);
    const currentStepIndex = statusSteps.indexOf(status);

    function handleReorder() {
        if (!order) {
            return;
        }

        order.items.forEach((item) => {
            addToCart(item.product, item.quantity);
        });

        navigate("/cart");
    }

    return (
        <main className="mx-auto max-w-4xl px-6 py-12">
            <Link
                to="/orders"
                className="mb-6 inline-block font-semibold text-indigo-600 hover:underline"
            >
                Back to My Orders
            </Link>

            <h1 className="mb-4 text-3xl font-bold text-slate-900">
                Order #{order.number ?? order.id.slice(0, 8)}
            </h1>

            <p className="mb-8 text-slate-600">
                Placed on {new Date(order.createdAt).toLocaleString()}
            </p>

            <section className="mb-6 rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-xl font-semibold text-slate-900">
                        Order Status
                    </h2>

                    <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
                        {status}
                    </span>
                </div>

                <ol className="grid grid-cols-3 gap-2">
                    {statusSteps.map((step, index) => {
                        const isCompleted = index <= currentStepIndex;

                        return (
                            <li
                                key={step}
                                className="flex flex-col items-center gap-3 text-center"
                                aria-current={
                                    index === currentStepIndex
                                        ? "step"
                                        : undefined
                                }
                            >
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${isCompleted
                                            ? "bg-green-600 text-white"
                                            : "bg-slate-200 text-slate-500"
                                        }`}
                                >
                                    {isCompleted ? "✓" : index + 1}
                                </div>

                                <span
                                    className={`text-sm font-medium ${isCompleted
                                            ? "text-green-700"
                                            : "text-slate-500"
                                        }`}
                                >
                                    {step}
                                </span>
                            </li>
                        );
                    })}
                </ol>

                <p className="mt-6 text-center text-sm text-slate-600">
                    Current status: {status}
                </p>
            </section>

            <section className="mb-6 rounded-xl bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold text-slate-900">
                    Order Items
                </h2>

                <ul className="divide-y divide-slate-200">
                    {order.items.map((item) => (
                        <li
                            key={item.product.id}
                            className="flex flex-wrap items-center justify-between gap-4 py-4"
                        >
                            <div>
                                <h3 className="font-semibold text-slate-900">
                                    {item.product.title}
                                </h3>

                                <p className="mt-1 text-sm text-slate-600">
                                    Quantity: {item.quantity}
                                </p>

                                <p className="mt-1 text-sm text-slate-600">
                                    Unit price: ${item.product.price.toFixed(2)}
                                </p>
                            </div>

                            <p className="font-semibold text-slate-900">
                                $
                                {(
                                    item.product.price * item.quantity
                                ).toFixed(2)}
                            </p>
                        </li>
                    ))}
                </ul>

                <div className="mt-4 border-t border-slate-200 pt-5">
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-600">
                            Total items
                        </span>

                        <span className="font-semibold text-slate-900">
                            {order.totalItems}
                        </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-4">
                        <span className="text-lg font-semibold text-slate-900">
                            Order Total
                        </span>

                        <span className="text-2xl font-bold text-indigo-700">
                            ${order.totalPrice.toFixed(2)}
                        </span>
                    </div>
                </div>
            </section>

            <section className="mb-6 rounded-xl bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold text-slate-900">
                    Shipping Information
                </h2>

                <dl className="space-y-4">
                    <div>
                        <dt className="text-sm font-medium text-slate-500">
                            Full Name
                        </dt>
                        <dd className="mt-1 text-slate-900">
                            {order.shippingInformation.fullName}
                        </dd>
                    </div>

                    <div>
                        <dt className="text-sm font-medium text-slate-500">
                            Email
                        </dt>
                        <dd className="mt-1 break-words text-slate-900">
                            {order.shippingInformation.email}
                        </dd>
                    </div>

                    <div>
                        <dt className="text-sm font-medium text-slate-500">
                            Address
                        </dt>
                        <dd className="mt-1 text-slate-900">
                            {order.shippingInformation.address}
                        </dd>
                    </div>

                    <div>
                        <dt className="text-sm font-medium text-slate-500">
                            City
                        </dt>
                        <dd className="mt-1 text-slate-900">
                            {order.shippingInformation.city}
                        </dd>
                    </div>

                    <div>
                        <dt className="text-sm font-medium text-slate-500">
                            Postal Code
                        </dt>
                        <dd className="mt-1 text-slate-900">
                            {order.shippingInformation.postalCode}
                        </dd>
                    </div>
                </dl>
            </section>

            <button
                type="button"
                onClick={handleReorder}
                className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
            >
                Reorder
            </button>
        </main>
    );
}
