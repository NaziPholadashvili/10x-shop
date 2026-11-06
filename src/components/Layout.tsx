
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

export default function Layout() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
            <ScrollToTop />

            <Header />

            <div className="flex-1">
                <Outlet />
            </div>

            <Footer />
        </div>
    );
}
