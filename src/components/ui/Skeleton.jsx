// Reusable Skeleton Components for Loading States

export const CardSkeleton = () => (
    <div className="card bg-base-100 shadow-xl border border-base-200 animate-pulse">
        <figure className="h-64 bg-base-300"></figure>
        <div className="card-body">
            <div className="h-6 bg-base-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-base-300 rounded w-1/2 mb-4"></div>
            <div className="flex justify-between items-center">
                <div className="h-8 bg-base-300 rounded w-20"></div>
                <div className="h-10 bg-base-300 rounded w-24"></div>
            </div>
        </div>
    </div>
);

export const ListSkeleton = ({ count = 6 }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(count)].map((_, i) => (
            <CardSkeleton key={i} />
        ))}
    </div>
);

export const TableSkeleton = ({ rows = 5, cols = 5 }) => (
    <div className="overflow-x-auto">
        <table className="table w-full">
            <thead>
                <tr>
                    {[...Array(cols)].map((_, i) => (
                        <th key={i}><div className="h-4 bg-base-300 rounded w-20 animate-pulse"></div></th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {[...Array(rows)].map((_, i) => (
                    <tr key={i}>
                        {[...Array(cols)].map((_, j) => (
                            <td key={j}><div className="h-4 bg-base-300 rounded w-24 animate-pulse"></div></td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export const DetailsSkeleton = () => (
    <div className="animate-pulse">
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2 h-96 bg-base-300 rounded-xl"></div>
            <div className="w-full lg:w-1/2 space-y-4">
                <div className="h-10 bg-base-300 rounded w-3/4"></div>
                <div className="h-6 bg-base-300 rounded w-1/4"></div>
                <div className="h-4 bg-base-300 rounded w-full"></div>
                <div className="h-4 bg-base-300 rounded w-full"></div>
                <div className="h-4 bg-base-300 rounded w-2/3"></div>
                <div className="h-12 bg-base-300 rounded w-40 mt-6"></div>
            </div>
        </div>
    </div>
);

export const StatCardSkeleton = () => (
    <div className="stat bg-base-100 rounded-xl shadow-lg animate-pulse">
        <div className="stat-figure text-primary">
            <div className="w-12 h-12 bg-base-300 rounded-full"></div>
        </div>
        <div className="stat-title h-4 bg-base-300 rounded w-24 mb-2"></div>
        <div className="stat-value h-8 bg-base-300 rounded w-16"></div>
    </div>
);
