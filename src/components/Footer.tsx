
export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-7xl px-6 py-4 text-center text-sm text-slate-600">
                © {new Date().getFullYear()} 10X Shop. All rights reserved.
            </div>
        </footer>
    );
}
