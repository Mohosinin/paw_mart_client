import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { FaTrashAlt, FaFileDownload, FaEye, FaShoppingBag } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from 'sweetalert2';
import { TableSkeleton } from "../../components/ui/Skeleton";

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const isDashboard = location.pathname.includes('/dashboard');

    useEffect(() => {
        if (user?.email) {
            setLoading(true);
            axios.get(`${import.meta.env.VITE_API_URL}/my-orders?email=${user.email}`)
                .then(res => {
                    setOrders(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user]);

    const handleDelete = id => {
        Swal.fire({
            title: 'Cancel Order?',
            text: "Are you sure you want to cancel this order?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, cancel it!',
            background: 'oklch(var(--b1))',
            color: 'oklch(var(--bc))'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_API_URL}/orders/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: 'Cancelled!',
                                text: 'Your order has been cancelled.',
                                icon: 'success',
                                background: 'oklch(var(--b1))',
                                color: 'oklch(var(--bc))'
                            });
                            const remaining = orders.filter(item => item._id !== id);
                            setOrders(remaining);
                        }
                    });
            }
        });
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        
        // Add header
        doc.setFontSize(22);
        doc.setTextColor(99, 102, 241); // Primary color
        doc.text("PawMart", 20, 20);
        
        doc.setFontSize(16);
        doc.setTextColor(0, 0, 0);
        doc.text("My Orders Report", 20, 35);
        
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 42);
        doc.text(`Customer: ${user?.displayName || 'N/A'}`, 20, 48);
        doc.text(`Email: ${user?.email || 'N/A'}`, 20, 54);
        
        // Add table
        autoTable(doc, {
            startY: 65,
            head: [['#', 'Product', 'Price', 'Qty', 'Date', 'Status']],
            body: orders.map((order, index) => [
                index + 1,
                order.productName,
                `$${order.price}`,
                order.quantity,
                order.date,
                'Confirmed'
            ]),
            headStyles: {
                fillColor: [99, 102, 241]
            },
            alternateRowStyles: {
                fillColor: [245, 245, 245]
            }
        });
        
        // Add footer
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(10);
            doc.setTextColor(150, 150, 150);
            doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
        }
        
        doc.save("pawmart-orders.pdf");
    };

    // Calculate total
    const totalAmount = orders.reduce((sum, order) => sum + (order.price * order.quantity), 0);

    return (
        <div className={`${isDashboard ? '' : 'max-w-6xl mx-auto my-10 px-4'}`}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold">My Orders</h2>
                    <p className="text-base-content/60 mt-1">
                        Track and manage your orders
                    </p>
                </div>
                {orders.length > 0 && (
                    <button 
                        onClick={generatePDF} 
                        className="btn btn-secondary gap-2 shadow-lg shadow-secondary/30"
                    >
                        <FaFileDownload /> Download Report
                    </button>
                )}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-base-100 rounded-xl p-4 border border-base-200 shadow-sm">
                    <p className="text-sm text-base-content/60">Total Orders</p>
                    <p className="text-2xl font-bold text-primary">{orders.length}</p>
                </div>
                <div className="bg-base-100 rounded-xl p-4 border border-base-200 shadow-sm">
                    <p className="text-sm text-base-content/60">Total Spent</p>
                    <p className="text-2xl font-bold text-secondary">${totalAmount.toFixed(2)}</p>
                </div>
                <div className="bg-base-100 rounded-xl p-4 border border-base-200 shadow-sm">
                    <p className="text-sm text-base-content/60">Pending</p>
                    <p className="text-2xl font-bold text-warning">{orders.filter(o => !o.status || o.status === 'pending').length}</p>
                </div>
                <div className="bg-base-100 rounded-xl p-4 border border-base-200 shadow-sm">
                    <p className="text-sm text-base-content/60">Completed</p>
                    <p className="text-2xl font-bold text-success">{orders.filter(o => o.status === 'completed').length}</p>
                </div>
            </div>

            {/* Loading State */}
            {loading && <TableSkeleton rows={5} cols={7} />}

            {/* Orders Table */}
            {!loading && (
                <div className="bg-base-100 rounded-2xl shadow-xl border border-base-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-base-200/50">
                                <tr>
                                    <th className="py-4 pl-6">#</th>
                                    <th className="py-4">Product</th>
                                    <th className="py-4">Price</th>
                                    <th className="py-4">Qty</th>
                                    <th className="py-4">Address</th>
                                    <th className="py-4">Date</th>
                                    <th className="py-4">Status</th>
                                    <th className="py-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="text-center py-16">
                                            <div className="text-6xl mb-4"><FaShoppingBag className="mx-auto text-base-content/20" /></div>
                                            <h3 className="text-xl font-bold text-base-content/50 mb-2">No orders yet</h3>
                                            <p className="text-base-content/40 mb-6">Start shopping to see your orders here!</p>
                                            <Link to="/pets-supplies" className="btn btn-primary gap-2">
                                                Browse Products
                                            </Link>
                                        </td>
                                    </tr>
                                ) : (
                                    orders.map((order, index) => (
                                        <tr key={order._id} className="hover:bg-base-200/30 transition-colors">
                                            <td className="pl-6 font-normal text-base-content/60">{index + 1}</td>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    {order.productImage && (
                                                        <div className="avatar">
                                                            <div className="w-12 h-12 rounded-lg">
                                                                <img src={order.productImage} alt={order.productName} />
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <div className="font-semibold">{order.productName}</div>
                                                        <div className="text-xs text-base-content/50">ID: {order.productId?.slice(-6) || 'N/A'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="font-bold text-primary">${order.price}</span>
                                            </td>
                                            <td>{order.quantity}</td>
                                            <td>
                                                <span className="max-w-[150px] truncate block" title={order.address}>
                                                    {order.address}
                                                </span>
                                            </td>
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
                                                <div className="flex justify-center gap-2">
                                                    <Link 
                                                        to={`/listings/${order.productId}`}
                                                        className="btn btn-sm btn-ghost btn-square tooltip" 
                                                        data-tip="View Product"
                                                    >
                                                        <FaEye className="w-4 h-4" />
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDelete(order._id)}
                                                        className="btn btn-sm btn-ghost btn-square text-error tooltip" 
                                                        data-tip="Cancel Order"
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

export default MyOrders;
