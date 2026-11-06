
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useCart } from "../context/useCart";
import { useOrders } from "../context/useOrders";
import { useTheme } from "../context/useTheme";
import type { ProductReview } from "../types/product";

const REVIEWS_STORAGE_KEY = "shop_reviews";
const ORDERS_STORAGE_KEY = "10x-shop-orders";

interface ProfileData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

type FieldErrors = Partial<Record<keyof ProfileData, string>>;
type StoredReviews = Record<string, ProductReview[]>;

function createEmptyProfile(): ProfileData {
    return {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
    };
}

function loadProfile(storageKey: string): ProfileData {
    const emptyProfile = createEmptyProfile();

    try {
        const saved = localStorage.getItem(storageKey);

        if (!saved) {
            return emptyProfile;
        }

        try {
            const parsed: unknown = JSON.parse(saved);

            if (
                typeof parsed === "object" &&
                parsed !== null &&
                !Array.isArray(parsed)
            ) {
                const data = parsed as Partial<ProfileData>;

                return {
                    firstName:
                        typeof data.firstName === "string"
                            ? data.firstName
                            : "",
                    lastName:
                        typeof data.lastName === "string"
                            ? data.lastName
                            : "",
                    email:
                        typeof data.email === "string"
                            ? data.email
                            : "",
                    phone:
                        typeof data.phone === "string"
                            ? data.phone
                            : "",
                };
            }
        } catch {
            // Support the previous plain-text fullName format.
        }

        const oldName = saved.trim().split(/\s+/);

        return {
            ...emptyProfile,
            firstName: oldName[0] ?? "",
            lastName: oldName.slice(1).join(" "),
        };
    } catch {
        return emptyProfile;
    }
}

function isProductReview(value: unknown): value is ProductReview {
    if (
        typeof value !== "object" ||
        value === null ||
        Array.isArray(value)
    ) {
        return false;
    }

    const review = value as Record<string, unknown>;

    return (
        typeof review.rating === "number" &&
        Number.isInteger(review.rating) &&
        review.rating >= 1 &&
        review.rating <= 5 &&
        typeof review.comment === "string" &&
        typeof review.date === "string" &&
        typeof review.reviewerName === "string" &&
        (
            review.userId === undefined ||
            typeof review.userId === "string"
        )
    );
}

function readReviewsForClearing(): StoredReviews | null {
    const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);

    if (saved === null) {
        return {};
    }

    const parsed: unknown = JSON.parse(saved);

    if (
        typeof parsed !== "object" ||
        parsed === null ||
        Array.isArray(parsed)
    ) {
        return null;
    }

    const reviews: StoredReviews = {};

    for (const [productId, value] of Object.entries(parsed)) {
        if (
            !Array.isArray(value) ||
            !value.every(isProductReview)
        ) {
            return null;
        }

        reviews[productId] = value;
    }

    return reviews;
}

function removeUserReviews(
    reviews: StoredReviews,
    username: string
): StoredReviews {
    const remainingReviews: StoredReviews = {};

    for (const [productId, productReviews] of Object.entries(reviews)) {
        remainingReviews[productId] = productReviews.filter(
            (review) => review.userId !== username
        );
    }

    return remainingReviews;
}

function restoreStorageValues(
    snapshots: Map<string, string | null>
): boolean {
    let restored = true;

    for (const [key, value] of snapshots) {
        try {
            if (value === null) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, value);
            }
        } catch (error) {
            console.error(
                `Failed to restore local data for ${key}:`,
                error
            );
            restored = false;
        }
    }

    return restored;
}

export default function Profile() {
    const { username, logout } = useAuth();
    const { clearCart } = useCart();
    const { orders, clearOrders } = useOrders();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const storageKey = `10x-shop-profile-${username}`;

    const [profile, setProfile] = useState<ProfileData>(
        () => loadProfile(storageKey)
    );

    const [formData, setFormData] = useState<ProfileData>(profile);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState<FieldErrors>({});
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (!success) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            setSuccess("");
        }, 4000);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [success]);

    const orderCount = orders.filter(
        (order) => order.userId === username
    ).length;

    function handleChange(
        field: keyof ProfileData,
        value: string
    ) {
        setFormData((previous) => ({
            ...previous,
            [field]: value,
        }));

        setErrors((previous) => ({
            ...previous,
            [field]: undefined,
        }));

        setError("");
        setSuccess("");
    }

    function validateForm(): boolean {
        const nextErrors: FieldErrors = {};

        if (formData.firstName.trim().length < 2) {
            nextErrors.firstName =
                "First name must be at least 2 characters";
        }

        if (formData.lastName.trim().length < 2) {
            nextErrors.lastName =
                "Last name must be at least 2 characters";
        }

        if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                formData.email.trim()
            )
        ) {
            nextErrors.email =
                "Please enter a valid email address";
        }

        const trimmedPhone = formData.phone.trim();

        if (
            trimmedPhone !== "" &&
            !/^\d{9,15}$/.test(trimmedPhone)
        ) {
            nextErrors.phone =
                "Please enter a valid phone number";
        }

        setErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    }

    function handleSave(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!validateForm()) {
            return;
        }

        const updatedProfile: ProfileData = {
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
        };

        try {
            localStorage.setItem(
                storageKey,
                JSON.stringify(updatedProfile)
            );

            setProfile(updatedProfile);
            setFormData(updatedProfile);
            setIsEditing(false);
            setErrors({});
            setSuccess("Profile updated successfully.");
        } catch {
            setError(
                "Could not save your profile. Please try again."
            );
        }
    }

    function handleCancel() {
        setFormData(profile);
        setErrors({});
        setError("");
        setSuccess("");
        setIsEditing(false);
    }

    function handleEdit() {
        setFormData(profile);
        setErrors({});
        setError("");
        setSuccess("");
        setIsEditing(true);
    }

    function handleClearLocalData() {
        setError("");
        setSuccess("");

        if (!username) {
            setError(
                "Unable to identify the current user. Please log in again."
            );
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to delete your saved profile, cart, orders, and your identifiable reviews? This action cannot be undone."
        );

        if (!confirmed) {
            return;
        }

        const owner = `user-${encodeURIComponent(username)}`;
        const cartKey = `10x-shop-cart-${owner}`;
        const promoKey = `10x-shop-promo-${owner}`;

        const storageKeys = [
            REVIEWS_STORAGE_KEY,
            ORDERS_STORAGE_KEY,
            storageKey,
            cartKey,
            promoKey,
        ];

        const snapshots = new Map<string, string | null>();
        let updatedReviews: StoredReviews;

        try {
            // Read every original value before changing storage.
            for (const key of storageKeys) {
                snapshots.set(key, localStorage.getItem(key));
            }

            const savedReviews = readReviewsForClearing();

            if (savedReviews === null) {
                setError(
                    "Saved reviews have an unexpected format. No data was cleared."
                );
                return;
            }

            updatedReviews = removeUserReviews(
                savedReviews,
                username
            );
        } catch (readError) {
            console.error("Failed to prepare local data clearing:", readError);
            setError(
                "Could not read saved data. No data was cleared."
            );
            return;
        }

        try {
            // Save all non-order changes before updating React state.
            localStorage.setItem(
                REVIEWS_STORAGE_KEY,
                JSON.stringify(updatedReviews)
            );

            localStorage.removeItem(storageKey);
            localStorage.setItem(cartKey, JSON.stringify([]));
            localStorage.removeItem(promoKey);

            // Clear orders last: this method updates Orders state
            // only after its localStorage write succeeds.
            const ordersCleared = clearOrders(username);

            if (!ordersCleared) {
                throw new Error("Failed to clear orders.");
            }
        } catch (clearError) {
            console.error("Failed to clear local data:", clearError);

            const restored = restoreStorageValues(snapshots);

            setError(
                restored
                    ? "Could not clear local data. Previous saved values were restored."
                    : "Could not fully restore saved data. Please check your local backup."
            );
            return;
        }

        // Storage changes succeeded. Update the cart's React state.
        // Its persistence effects will save the empty cart.
        clearCart();

        const clearedProfile = createEmptyProfile();

        setProfile(clearedProfile);
        setFormData(clearedProfile);
        setErrors({});
        setIsEditing(false);

        setSuccess(
            "Local data cleared successfully. Your session and theme were preserved."
        );
    }

    function handleLogout() {
        logout();
        navigate("/");
    }

    const inputClassName =
        "w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400";

    return (
        <main className="mx-auto min-h-[70vh] max-w-4xl px-6 py-12 text-slate-900 dark:text-slate-100">
            <h1 className="mb-8 text-3xl font-bold text-slate-900 dark:text-white">
                My Profile
            </h1>

            <div className="space-y-6">
                {/* Account Information */}
                <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                    <h2 className="mb-6 text-xl font-semibold text-slate-900 dark:text-white">
                        Account Information
                    </h2>

                    <div className="mb-6">
                        <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">
                            Username
                        </p>
                        <p className="font-medium text-slate-900 dark:text-slate-100">
                            {username}
                        </p>
                    </div>

                    <div className="mb-6">
                        <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">
                            Total Orders
                        </p>
                        <p className="font-medium text-slate-900 dark:text-slate-100">
                            {orderCount}
                        </p>
                    </div>

                    {isEditing ? (
                        <form
                            onSubmit={handleSave}
                            noValidate
                            className="space-y-5"
                        >
                            <div>
                                <label
                                    htmlFor="firstName"
                                    className="mb-2 block font-medium"
                                >
                                    First Name
                                </label>

                                <input
                                    id="firstName"
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(event) =>
                                        handleChange(
                                            "firstName",
                                            event.target.value
                                        )
                                    }
                                    maxLength={100}
                                    className={inputClassName}
                                    aria-invalid={Boolean(errors.firstName)}
                                    aria-describedby={
                                        errors.firstName
                                            ? "firstName-error"
                                            : undefined
                                    }
                                />

                                {errors.firstName && (
                                    <p
                                        id="firstName-error"
                                        role="alert"
                                        className="mt-1 text-sm text-red-600 dark:text-red-400"
                                    >
                                        {errors.firstName}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="lastName"
                                    className="mb-2 block font-medium"
                                >
                                    Last Name
                                </label>

                                <input
                                    id="lastName"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(event) =>
                                        handleChange(
                                            "lastName",
                                            event.target.value
                                        )
                                    }
                                    maxLength={100}
                                    className={inputClassName}
                                    aria-invalid={Boolean(errors.lastName)}
                                    aria-describedby={
                                        errors.lastName
                                            ? "lastName-error"
                                            : undefined
                                    }
                                />

                                {errors.lastName && (
                                    <p
                                        id="lastName-error"
                                        role="alert"
                                        className="mt-1 text-sm text-red-600 dark:text-red-400"
                                    >
                                        {errors.lastName}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="profileEmail"
                                    className="mb-2 block font-medium"
                                >
                                    Email
                                </label>

                                <input
                                    id="profileEmail"
                                    type="email"
                                    value={formData.email}
                                    onChange={(event) =>
                                        handleChange(
                                            "email",
                                            event.target.value
                                        )
                                    }
                                    className={inputClassName}
                                    aria-invalid={Boolean(errors.email)}
                                    aria-describedby={
                                        errors.email
                                            ? "email-error"
                                            : undefined
                                    }
                                />

                                {errors.email && (
                                    <p
                                        id="email-error"
                                        role="alert"
                                        className="mt-1 text-sm text-red-600 dark:text-red-400"
                                    >
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="phone"
                                    className="mb-2 block font-medium"
                                >
                                    Phone (Optional)
                                </label>

                                <input
                                    id="phone"
                                    type="tel"
                                    inputMode="numeric"
                                    value={formData.phone}
                                    onChange={(event) =>
                                        handleChange(
                                            "phone",
                                            event.target.value
                                        )
                                    }
                                    className={inputClassName}
                                    aria-invalid={Boolean(errors.phone)}
                                    aria-describedby={
                                        errors.phone
                                            ? "phone-error"
                                            : undefined
                                    }
                                />

                                {errors.phone && (
                                    <p
                                        id="phone-error"
                                        role="alert"
                                        className="mt-1 text-sm text-red-600 dark:text-red-400"
                                    >
                                        {errors.phone}
                                    </p>
                                )}
                            </div>

                            {error && (
                                <p
                                    role="alert"
                                    className="text-sm text-red-600 dark:text-red-400"
                                >
                                    {error}
                                </p>
                            )}

                            <div className="flex flex-wrap gap-3">
                                <button
                                    type="submit"
                                    className="rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700"
                                >
                                    Save Changes
                                </button>

                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="rounded-lg border border-slate-300 px-5 py-2 font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div>
                            <div className="mb-5 space-y-4">
                                {(
                                    [
                                        ["First Name", profile.firstName],
                                        ["Last Name", profile.lastName],
                                        ["Email", profile.email],
                                        ["Phone", profile.phone],
                                    ] as const
                                ).map(([label, value]) => (
                                    <div key={label}>
                                        <p className="mb-1 text-sm text-slate-500 dark:text-slate-400">
                                            {label}
                                        </p>
                                        <p className="font-medium text-slate-900 dark:text-slate-100">
                                            {value || "Not provided"}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <button
                                type="button"
                                onClick={handleEdit}
                                className="rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700"
                            >
                                Edit Profile
                            </button>
                        </div>
                    )}
                </section>

                {/* Theme Settings */}
                <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                    <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">
                        Appearance
                    </h2>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <p className="font-medium">
                                Theme
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Current theme: {theme}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label="Toggle theme"
                            className="rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700"
                        >
                            Switch to {theme === "light" ? "Dark" : "Light"} Mode
                        </button>
                    </div>
                </section>

                {/* Local Data */}
                <section className="rounded-xl border border-red-200 bg-white p-6 shadow-sm dark:border-red-900 dark:bg-slate-800">
                    <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                        Local Data
                    </h2>

                    <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
                        Clear your saved profile, cart, orders, and reviews
                        linked to your account. Reviews without an identifiable
                        account owner will be preserved. Your login session
                        and selected theme will also be preserved.
                    </p>

                    <button
                        type="button"
                        onClick={handleClearLocalData}
                        className="rounded-lg border border-red-500 px-5 py-2 font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-slate-700"
                    >
                        Clear Local Data
                    </button>
                </section>

                {/* Logout */}
                <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                    <h2 className="mb-3 text-xl font-semibold text-slate-900 dark:text-white">
                        Account
                    </h2>

                    <p className="mb-4 text-sm text-slate-600 dark:text-slate-300">
                        Log out of your 10X Shop account.
                    </p>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"
                    >
                        Log Out
                    </button>
                </section>

                {error && !isEditing && (
                    <p
                        role="alert"
                        className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300"
                    >
                        {error}
                    </p>
                )}

                {success && (
                    <p
                        role="status"
                        className="rounded-lg bg-green-50 p-3 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300"
                    >
                        {success}
                    </p>
                )}
            </div>
        </main>
    );
}
