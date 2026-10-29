
import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContextDefinition";

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [username, setUsername] = useState<string | null>(() => {
        return localStorage.getItem("10x-shop-username");
    });

    function login(name: string) {
        setUsername(name);
        localStorage.setItem("10x-shop-username", name);
    }

    function logout() {
        setUsername(null);
        localStorage.removeItem("10x-shop-username");
    }

    return (
        <AuthContext.Provider
            value={{
                username,
                isAuthenticated: username !== null,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
