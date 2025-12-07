import { useContext, useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from 'sweetalert2';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if(user?.email){
            axios.get(`${import.meta.env.VITE_API_URL}/my-orders?email=${user.email}`)
                .then(res => setOrders(res.data));
        }
    }, [user]);

    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel order!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${import.meta.env.VITE_API_URL}/orders/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire(
                                'Cancelled!',
                                'Your order has been cancelled.',
                                'success'
                            )
                            const remaining = orders.filter(item => item._id !== id);
                            setOrders(remaining);
                        }
                    })
            }
        })
    }

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("My Orders Report", 20, 10);
        autoTable(doc, {
            head: [['Product Name', 'Buyer Name', 'Price', 'Quantity', 'Address', 'Date']],
            body: orders.map(order => [order.productName, order.buyerName, `$${order.price}`, order.quantity, order.address, order.date]),
        });
        doc.save("my-orders.pdf");
    }

    return (
        <div className="overflow-x-auto w-full max-w-6xl mx-auto my-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">My Orders</h2>
                <button onClick={generatePDF} className="btn btn-secondary shadow-lg">Download Report</button>
            </div>

            <div className="overflow-x-auto bg-base-100 rounded-lg shadow-xl border border-base-200">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-base-300 text-base-content uppercase text-xs font-bold tracking-wider">
                        <tr>
                            <th className="py-4 pl-6">#</th>
                            <th className="py-4">Product Name</th>
                            <th className="py-4">Buyer Name</th>
                            <th className="py-4">Price</th>
                            <th className="py-4">Quantity</th>
                            <th className="py-4">Address</th>
                            <th className="py-4">Date</th>
                            <th className="py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-base-200">
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center py-8 text-base-content/60">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order, index) => (
                                <tr key={order._id} className="hover:bg-base-200/50 transition-colors">
                                    <th className="pl-6">{index + 1}</th>
                                    <td className="font-semibold">{order.productName}</td>
                                    <td>{order.buyerName}</td>
                                    <td className="font-mono">${order.price}</td>
                                    <td>{order.quantity}</td>
                                    <td className="max-w-xs truncate" title={order.address}>{order.address}</td>
                                    <td>{order.date}</td>
                                    <td>
                                        <div className="flex justify-center">
                                            <button 
                                                onClick={() => handleDelete(order._id)} 
                                                className="btn btn-sm btn-error btn-outline hover:text-white transition-all shadow-sm"
                                                title="Cancel Order"
                                            >
                                                <FaTrashAlt className="h-4 w-4" />
                                                <span className="hidden sm:inline">Cancel</span>
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
    );
};

export default MyOrders;
