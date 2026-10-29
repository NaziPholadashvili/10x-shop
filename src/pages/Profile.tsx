
import { useState, type FormEvent } from "react";
import { useAuth } from "../context/useAuth";

export default function Profile() {
    const { username } = useAuth();

    const storageKey = `10x-shop-profile-${username}`;

    const [fullName, setFullName] = useState<string>(() => {
        try {
            return localStorage.getItem(storageKey) ?? "";
        } catch {
            return "";
        }
    });

    const [nameInput, setNameInput] = useState(fullName);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleSave(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const trimmedName = nameInput.trim();

        if (!trimmedName) {
            setError("Full name is required.");
            setSuccess("");
            return;
        }

        if (trimmedName.length > 100) {
            setError("Full name must be 100 characters or less.");
            setSuccess("");
            return;
        }

        try {
            localStorage.setItem(storageKey, trimmedName);

            setFullName(trimmedName);
            setNameInput(trimmedName);
            setIsEditing(false);
            setError("");
            setSuccess("Profile updated successfully.");
        } catch {
            setError("Could not save your profile. Please try again.");
            setSuccess("");
        }
    }

    function handleCancel() {
        setNameInput(fullName);
        setIsEditing(false);
        setError("");
        setSuccess("");
    }

    function handleEdit() {
        setNameInput(fullName);
        setIsEditing(true);
        setError("");
        setSuccess("");
    }

    return (
        <main className="mx-auto max-w-4xl px-6 py-12">
            <h1 className="mb-8 text-3xl font-bold text-slate-900">
                My Profile
            </h1>

            <section className="rounded-xl bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-xl font-semibold text-slate-900">
                    Account Information
                </h2>

                <div className="mb-6">
                    <p className="mb-1 text-sm text-slate-500">
                        Username
                    </p>

                    <p className="font-medium text-slate-900">
                        {username}
                    </p>
                </div>

                {isEditing ? (
                    <form onSubmit={handleSave} className="space-y-4">
                        <div>
                            <label
                                htmlFor="fullName"
                                className="mb-2 block font-medium text-slate-900"
                            >
                                Full Name
                            </label>

                            <input
                                id="fullName"
                                type="text"
                                value={nameInput}
                                onChange={(event) =>
                                    setNameInput(event.target.value)
                                }
                                maxLength={101}
                                required
                                className="w-full rounded-lg border border-slate-300 p-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            />
                        </div>

                        {error && (
                            <p role="alert" className="text-sm text-red-600">
                                {error}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-3">
                            <button
                                type="submit"
                                className="rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700"
                            >
                                Save
                            </button>

                            <button
                                type="button"
                                onClick={handleCancel}
                                className="rounded-lg border border-slate-300 px-5 py-2 font-semibold text-slate-700 hover:bg-slate-100"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div>
                        <p className="mb-1 text-sm text-slate-500">
                            Full Name
                        </p>

                        <p className="mb-5 font-medium text-slate-900">
                            {fullName || "Not provided"}
                        </p>

                        <button
                            type="button"
                            onClick={handleEdit}
                            className="rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700"
                        >
                            Edit Profile
                        </button>

                        {success && (
                            <p
                                role="status"
                                className="mt-4 text-sm text-green-700"
                            >
                                {success}
                            </p>
                        )}
                    </div>
                )}
            </section>
        </main>
    );
}
