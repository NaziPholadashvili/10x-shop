
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

export default function Layout() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <ScrollToTop />

            <Header />

            <div className="flex-1">
                <Outlet />
            </div>

            <Footer />
        </div>
    );
}
