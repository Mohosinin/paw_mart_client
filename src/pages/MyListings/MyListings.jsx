import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { FaEdit, FaTrashAlt, FaPlus, FaEye } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import Swal from 'sweetalert2';
import { TableSkeleton } from "../../components/ui/Skeleton";

const MyListings = () => {
    const { user } = useContext(AuthContext);
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    
    // Check if we're in dashboard context
    const isDashboard = location.pathname.includes('/dashboard');

    useEffect(() => {
        if (user?.email) {
            setLoading(true);
            axios.get(`${import.meta.env.VITE_API_URL}/my-listings?email=${user.email}`)
                .then(res => {
                    setListings(res.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching listings:', error);
                    setLoading(false);
                });
        }
    }, [user]);

    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6366f1',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, delete it!',
            background: 'oklch(var(--b1))',
            color: 'oklch(var(--bc))'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_API_URL}/listings/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'Your listing has been deleted.',
                                icon: 'success',
                                background: 'oklch(var(--b1))',
                                color: 'oklch(var(--bc))'
                            });
                            const remaining = listings.filter(item => item._id !== id);
                            setListings(remaining);
                        }
                    })
                    .catch(error => {
                        console.error('Error deleting listing:', error);
                        Swal.fire({
                            title: 'Error!',
                            text: error.response?.data?.message || 'Failed to delete listing.',
                            icon: 'error',
                            background: 'oklch(var(--b1))',
                            color: 'oklch(var(--bc))'
                        });
                    });
            }
        });
    };

    const updatePath = isDashboard ? '/dashboard/update-listing' : '/update-listing';
    const addPath = isDashboard ? '/dashboard/add-listing' : '/add-listing';

    return (
        <div className={`${isDashboard ? '' : 'max-w-6xl mx-auto my-10 px-4'}`}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold">My Listings</h2>
                    <p className="text-base-content/60 mt-1">
                        Manage your pet and product listings
                    </p>
                </div>
                <Link to={addPath} className="btn btn-primary gap-2 shadow-lg shadow-primary/30">
                    <FaPlus /> Add New Listing
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-base-100 rounded-xl p-4 border border-base-200 shadow-sm">
                    <p className="text-sm text-base-content/60">Total Listings</p>
                    <p className="text-2xl font-bold text-primary">{listings.length}</p>
                </div>
                <div className="bg-base-100 rounded-xl p-4 border border-base-200 shadow-sm">
                    <p className="text-sm text-base-content/60">Pets</p>
                    <p className="text-2xl font-bold">{listings.filter(l => l.category === 'Pets').length}</p>
                </div>
                <div className="bg-base-100 rounded-xl p-4 border border-base-200 shadow-sm">
                    <p className="text-sm text-base-content/60">Products</p>
                    <p className="text-2xl font-bold">{listings.filter(l => l.category !== 'Pets').length}</p>
                </div>
                <div className="bg-base-100 rounded-xl p-4 border border-base-200 shadow-sm">
                    <p className="text-sm text-base-content/60">Free Adoptions</p>
                    <p className="text-2xl font-bold text-accent">{listings.filter(l => l.price === 0).length}</p>
                </div>
            </div>

            {/* Loading State */}
            {loading && <TableSkeleton rows={5} cols={6} />}

            {/* Table */}
            {!loading && (
                <div className="bg-base-100 rounded-2xl shadow-xl border border-base-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-base-200/50">
                                <tr>
                                    <th className="py-4 pl-6">#</th>
                                    <th className="py-4">Image</th>
                                    <th className="py-4">Name</th>
                                    <th className="py-4">Category</th>
                                    <th className="py-4">Price</th>
                                    <th className="py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-base-200">
                                {listings.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center py-16">
                                            <div className="text-6xl mb-4">📦</div>
                                            <h3 className="text-xl font-bold text-base-content/50 mb-2">No listings yet</h3>
                                            <p className="text-base-content/40 mb-6">Start by adding your first listing!</p>
                                            <Link to={addPath} className="btn btn-primary gap-2">
                                                <FaPlus /> Add Listing
                                            </Link>
                                        </td>
                                    </tr>
                                ) : (
                                    listings.map((item, index) => (
                                        <tr key={item._id} className="hover:bg-base-200/30 transition-colors">
                                            <th className="pl-6 font-normal text-base-content/60">{index + 1}</th>
                                            <td>
                                                <div className="avatar">
                                                    <div className="w-14 h-14 rounded-xl shadow-sm">
                                                        <img 
                                                            src={item.image} 
                                                            alt={item.name}
                                                            onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="font-semibold">{item.name}</div>
                                                <div className="text-sm text-base-content/50 truncate max-w-[200px]">
                                                    {item.location}
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`badge badge-sm ${
                                                    item.category === 'Pets' ? 'badge-primary' : 
                                                    item.category === 'Pet Food' ? 'badge-secondary' : 
                                                    'badge-accent'
                                                }`}>
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`font-bold ${item.price === 0 ? 'text-accent' : 'text-primary'}`}>
                                                    {item.price === 0 ? 'Free' : `$${item.price}`}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="flex justify-center gap-2">
                                                    <Link 
                                                        to={`/listings/${item._id}`}
                                                        className="btn btn-sm btn-ghost btn-square tooltip" 
                                                        data-tip="View"
                                                    >
                                                        <FaEye className="w-4 h-4" />
                                                    </Link>
                                                    <Link 
                                                        to={`${updatePath}/${item._id}`}
                                                        className="btn btn-sm btn-ghost btn-square text-info tooltip" 
                                                        data-tip="Edit"
                                                    >
                                                        <FaEdit className="w-4 h-4" />
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDelete(item._id)}
                                                        className="btn btn-sm btn-ghost btn-square text-error tooltip" 
                                                        data-tip="Delete"
                                                    >
                                                        <FaTrashAlt className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyListings;
