
export default function ProductCardSkeleton() {
    return (
        <article
            aria-hidden="true"
            className="animate-pulse rounded-xl bg-white p-4 shadow-sm"
        >
            {/* Image placeholder */}
            <div className="h-48 w-full rounded-lg bg-slate-200" />

            {/* Title placeholder */}
            <div className="mt-4 space-y-2">
                <div className="h-4 w-3/4 rounded bg-slate-200" />
                <div className="h-4 w-1/2 rounded bg-slate-200" />
            </div>

            {/* Price placeholder */}
            <div className="mt-4 h-5 w-1/3 rounded bg-slate-200" />

            {/* Button placeholder */}
            <div className="mt-4 h-10 w-full rounded-lg bg-slate-200" />
        </article>
    );
}
