import { useEffect, useState } from "react";
import { FiSearch, FiEye, FiTrash2, FiCheck, FiX, FiPackage } from "react-icons/fi";
import axios from "axios";
import { TableSkeleton } from "../../components/ui/Skeleton";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/orders`);
            setOrders(response.data);
            setFilteredOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
            toast.error("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let result = orders;
        
        // Search filter
        if (search) {
            result = result.filter(o => 
                o.productName?.toLowerCase().includes(search.toLowerCase()) ||
                o.email?.toLowerCase().includes(search.toLowerCase()) ||
                o.buyerName?.toLowerCase().includes(search.toLowerCase())
            );
        }
        
        // Status filter
        if (statusFilter) {
            result = result.filter(o => (o.status || 'pending') === statusFilter);
        }
        
        setFilteredOrders(result);
    }, [search, statusFilter, orders]);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/orders/${orderId}`, { status: newStatus });
            toast.success(`Order ${newStatus}`);
            fetchOrders();
        } catch (error) {
            toast.error("Failed to update order");
        }
    };

    const handleDelete = async (orderId) => {
        const result = await Swal.fire({
            title: 'Delete Order?',
            text: "This will permanently delete the order.",
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, delete!',
            background: 'oklch(var(--b1))',
            color: 'oklch(var(--bc))'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/orders/${orderId}`);
                toast.success("Order deleted");
                fetchOrders();
            } catch (error) {
                toast.error("Failed to delete order");
            }
        }
    };

    // Calculate stats
    const totalRevenue = orders.reduce((sum, o) => sum + (o.price * o.quantity || 0), 0);
    const pendingCount = orders.filter(o => !o.status || o.status === 'pending').length;
    const completedCount = orders.filter(o => o.status === 'completed').length;

    if (loading) {
        return (
            <div className="space-y-6">
                <TableSkeleton rows={8} cols={7} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold">All Orders</h2>
                    <p className="text-base-content/60 mt-1">
                        Manage all customer orders ({orders.length} total)
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-base-100 rounded-xl p-4 border border-base-200 shadow-sm">
                    <p className="text-sm text-base-content/60">Total Orders</p>
                    <p className="text-2xl font-bold text-primary">{orders.length}</p>
                </div>
                <div className="bg-base-100 rounded-xl p-4 border border-base-200 shadow-sm">
                    <p className="text-sm text-base-content/60">Total Revenue</p>
                    <p className="text-2xl font-bold text-success">${totalRevenue.toFixed(2)}</p>
                </div>
                <div className="bg-base-100 rounded-xl p-4 border border-base-200 shadow-sm">
                    <p className="text-sm text-base-content/60">Pending</p>
                    <p className="text-2xl font-bold text-warning">{pendingCount}</p>
                </div>
                <div className="bg-base-100 rounded-xl p-4 border border-base-200 shadow-sm">
                    <p className="text-sm text-base-content/60">Completed</p>
                    <p className="text-2xl font-bold text-accent">{completedCount}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-200">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/50" />
                        <input
                            type="text"
                            placeholder="Search by product, buyer, or email..."
                            className="input input-bordered w-full pl-12"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    
                    <select
                        className="select select-bordered w-full md:w-48"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-base-100 rounded-2xl shadow-lg border border-base-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-base-200/50">
                            <tr>
                                <th className="py-4 pl-6">#</th>
                                <th>Product</th>
                                <th>Buyer</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-16">
                                        <FiPackage className="w-16 h-16 mx-auto text-base-content/20 mb-4" />
                                        <h3 className="text-xl font-bold text-base-content/50 mb-2">No orders found</h3>
                                        <p className="text-base-content/40">Try adjusting your filters</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order, index) => (
                                    <tr key={order._id} className="hover:bg-base-200/30 transition-colors">
                                        <td className="pl-6 text-base-content/60">{index + 1}</td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                {order.productImage && (
                                                    <img 
                                                        src={order.productImage} 
                                                        alt="" 
                                                        className="w-10 h-10 rounded-lg object-cover"
                                                    />
                                                )}
                                                <div>
                                                    <div className="font-semibold">{order.productName}</div>
                                                    <div className="text-xs text-base-content/50">Qty: {order.quantity}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <div className="font-medium">{order.buyerName}</div>
                                                <div className="text-xs text-base-content/50">{order.email}</div>
                                            </div>
                                        </td>
                                        <td className="font-bold text-primary">${(order.price * order.quantity).toFixed(2)}</td>
                                        <td className="text-base-content/70">{order.date}</td>
                                        <td>
                                            <span className={`badge badge-sm ${
                                                order.status === 'completed' ? 'badge-success' :
                                                order.status === 'cancelled' ? 'badge-error' :
                                                'badge-warning'
                                            }`}>
                                                {order.status || 'Pending'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="flex justify-center gap-1">
                                                {(order.status !== 'completed') && (
                                                    <button 
                                                        onClick={() => handleStatusChange(order._id, 'completed')}
                                                        className="btn btn-sm btn-ghost btn-square text-success tooltip" 
                                                        data-tip="Mark Complete"
                                                    >
                                                        <FiCheck className="w-4 h-4" />
                                                    </button>
                                                )}
                                                {(order.status !== 'cancelled') && (
                                                    <button 
                                                        onClick={() => handleStatusChange(order._id, 'cancelled')}
                                                        className="btn btn-sm btn-ghost btn-square text-warning tooltip" 
                                                        data-tip="Cancel"
                                                    >
                                                        <FiX className="w-4 h-4" />
                                                    </button>
                                                )}
                                                <button 
                                                    onClick={() => handleDelete(order._id)}
                                                    className="btn btn-sm btn-ghost btn-square text-error tooltip" 
                                                    data-tip="Delete"
                                                >
                                                    <FiTrash2 className="w-4 h-4" />
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
        </div>
    );
};

export default AllOrders;
