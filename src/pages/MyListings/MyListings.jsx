import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";

import Swal from 'sweetalert2';

const MyListings = () => {
    const { user } = useContext(AuthContext);
    const [listings, setListings] = useState([]);

    useEffect(() => {
        if(user?.email){
            axios.get(`http://localhost:5000/my-listings?email=${user.email}`)
                .then(res => setListings(res.data));
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
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/listings/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your listing has been deleted.',
                                'success'
                            )
                            const remaining = listings.filter(item => item._id !== id);
                            setListings(remaining);
                        }
                    })
            }
        })
    }

    return (
        <div className="overflow-x-auto w-full max-w-6xl mx-auto my-10">
            <h2 className="text-3xl font-bold text-center mb-6">My Listings</h2>
            <div className="overflow-x-auto bg-base-100 rounded-lg shadow-xl border border-base-200">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-base-300 text-base-content uppercase text-xs font-bold tracking-wider">
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
                                <td colSpan="6" className="text-center py-8 text-base-content/60">
                                    No listings found. Start by adding one!
                                </td>
                            </tr>
                        ) : (
                            listings.map((item, index) => (
                                <tr key={item._id} className="hover:bg-base-200/50 transition-colors">
                                    <th className="pl-6">{index + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12 shadow-sm bg-base-300">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-semibold">{item.name}</td>
                                    <td>
                                        <span className="badge badge-ghost badge-sm font-medium">{item.category}</span>
                                    </td>
                                    <td className="font-mono">{item.price === 0 ? 'Free' : `$${item.price}`}</td>
                                    <td>
                                        <div className="flex justify-center gap-3">
                                            <Link 
                                                to={`/update-listing/${item._id}`} 
                                                className="btn btn-sm btn-info btn-outline hover:text-white transition-all shadow-sm"
                                                title="Update Listing"
                                            >
                                                <FaEdit className="h-4 w-4" />
                                                <span className="hidden sm:inline">Edit</span>
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(item._id)} 
                                                className="btn btn-sm btn-error btn-outline hover:text-white transition-all shadow-sm"
                                                title="Delete Listing"
                                            >
                                                <FaTrashAlt className="h-4 w-4" />
                                                <span className="hidden sm:inline">Delete</span>
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

export default MyListings;
