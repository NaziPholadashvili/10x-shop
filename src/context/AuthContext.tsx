
import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

interface AuthContextType {
    username: string | null;
    isAuthenticated: boolean;
    login: (username: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [username, setUsername] = useState<string | null>(null);

    function login(name: string) {
        setUsername(name);
    }

    function logout() {
        setUsername(null);
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

export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
}
