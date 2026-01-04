import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { FiSearch, FiEdit2, FiTrash2, FiShield, FiUserCheck, FiUser, FiLock, FiUnlock, FiMoreVertical } from "react-icons/fi";
import { TableSkeleton } from "../../components/ui/Skeleton";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ManageUsers = () => {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
            setUsers(response.data);
            setFilteredUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let result = users;
        
        // Search filter
        if (search) {
            result = result.filter(u => 
                u.name?.toLowerCase().includes(search.toLowerCase()) ||
                u.email?.toLowerCase().includes(search.toLowerCase())
            );
        }
        
        // Role filter
        if (roleFilter) {
            result = result.filter(u => u.role === roleFilter);
        }
        
        setFilteredUsers(result);
    }, [search, roleFilter, users]);

    const handleRoleChange = async (userId, newRole, userName) => {
        const result = await Swal.fire({
            title: 'Change User Role?',
            html: `Are you sure you want to change <b>${userName}</b>'s role to <b>${newRole}</b>?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#6366f1',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, change it!',
            background: 'oklch(var(--b1))',
            color: 'oklch(var(--bc))'
        });

        if (result.isConfirmed) {
            try {
                await axios.patch(`${import.meta.env.VITE_API_URL}/users/role/${userId}`, { role: newRole });
                toast.success(`Role updated to ${newRole}`);
                fetchUsers();
            } catch (error) {
                toast.error("Failed to update role");
            }
        }
    };

    const handleStatusChange = async (userId, newStatus, userName) => {
        const action = newStatus === 'blocked' ? 'block' : 'unblock';
        const result = await Swal.fire({
            title: `${action.charAt(0).toUpperCase() + action.slice(1)} User?`,
            html: `Are you sure you want to ${action} <b>${userName}</b>?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: newStatus === 'blocked' ? '#ef4444' : '#22c55e',
            cancelButtonColor: '#64748b',
            confirmButtonText: `Yes, ${action}!`,
            background: 'oklch(var(--b1))',
            color: 'oklch(var(--bc))'
        });

        if (result.isConfirmed) {
            try {
                await axios.patch(`${import.meta.env.VITE_API_URL}/users/status/${userId}`, { status: newStatus });
                toast.success(`User ${action}ed successfully`);
                fetchUsers();
            } catch (error) {
                toast.error(`Failed to ${action} user`);
            }
        }
    };

    const handleDeleteUser = async (userId, userName) => {
        const result = await Swal.fire({
            title: 'Delete User?',
            html: `Are you sure you want to permanently delete <b>${userName}</b>?<br><small>This action cannot be undone!</small>`,
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
                await axios.delete(`${import.meta.env.VITE_API_URL}/users/${userId}`);
                toast.success("User deleted successfully");
                fetchUsers();
            } catch (error) {
                toast.error("Failed to delete user");
            }
        }
    };

    const getRoleBadge = (role) => {
        switch (role) {
            case 'admin':
                return <span className="badge badge-error gap-1"><FiShield className="w-3 h-3" /> Admin</span>;
            case 'seller':
                return <span className="badge badge-warning gap-1"><FiUserCheck className="w-3 h-3" /> Seller</span>;
            default:
                return <span className="badge badge-info gap-1"><FiUser className="w-3 h-3" /> User</span>;
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-200">
                    <TableSkeleton rows={8} cols={6} />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold">Manage Users</h2>
                    <p className="text-base-content/60 mt-1">
                        View and manage all registered users ({users.length} total)
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-200">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/50" />
                        <input
                            type="text"
                            placeholder="Search by name or email..."
                            className="input input-bordered w-full pl-12"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    
                    {/* Role Filter */}
                    <select
                        className="select select-bordered w-full md:w-48"
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                    >
                        <option value="">All Roles</option>
                        <option value="admin">Admins</option>
                        <option value="seller">Sellers</option>
                        <option value="user">Users</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-base-100 rounded-2xl shadow-lg border border-base-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead className="bg-base-200/50">
                            <tr>
                                <th className="py-4 pl-6">#</th>
                                <th>User</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Joined</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center py-16">
                                        <div className="text-6xl mb-4">👥</div>
                                        <h3 className="text-xl font-bold text-base-content/50 mb-2">No users found</h3>
                                        <p className="text-base-content/40">Try adjusting your search or filters</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((u, index) => (
                                    <tr key={u._id} className="hover:bg-base-200/30 transition-colors">
                                        <td className="pl-6 font-normal text-base-content/60">{index + 1}</td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="w-10 rounded-full ring-2 ring-base-200">
                                                        <img 
                                                            src={u.photo || "https://i.ibb.co/tYHpt12/avatar.png"} 
                                                            alt={u.name}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-semibold">{u.name || 'N/A'}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-base-content/70">{u.email}</td>
                                        <td>{getRoleBadge(u.role)}</td>
                                        <td>
                                            <span className={`badge badge-sm ${u.status === 'blocked' ? 'badge-error' : 'badge-success'}`}>
                                                {u.status || 'active'}
                                            </span>
                                        </td>
                                        <td className="text-base-content/60 text-sm">
                                            {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td>
                                            {u.email !== user?.email ? (
                                                <div className="dropdown dropdown-end">
                                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-sm btn-square">
                                                        <FiMoreVertical className="w-5 h-5" />
                                                    </div>
                                                    <ul tabIndex={0} className="dropdown-content z-50 menu p-2 shadow-xl bg-base-100 rounded-xl w-52 border border-base-200">
                                                        <li className="menu-title text-xs uppercase tracking-wide opacity-60">Change Role</li>
                                                        <li>
                                                            <button 
                                                                onClick={() => handleRoleChange(u._id, 'admin', u.name)}
                                                                className={u.role === 'admin' ? 'active' : ''}
                                                            >
                                                                <FiShield className="w-4 h-4" /> Make Admin
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button 
                                                                onClick={() => handleRoleChange(u._id, 'seller', u.name)}
                                                                className={u.role === 'seller' ? 'active' : ''}
                                                            >
                                                                <FiUserCheck className="w-4 h-4" /> Make Seller
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button 
                                                                onClick={() => handleRoleChange(u._id, 'user', u.name)}
                                                                className={u.role === 'user' || !u.role ? 'active' : ''}
                                                            >
                                                                <FiUser className="w-4 h-4" /> Make User
                                                            </button>
                                                        </li>
                                                        <div className="divider my-1"></div>
                                                        <li className="menu-title text-xs uppercase tracking-wide opacity-60">Status</li>
                                                        {u.status === 'blocked' ? (
                                                            <li>
                                                                <button onClick={() => handleStatusChange(u._id, 'active', u.name)} className="text-success">
                                                                    <FiUnlock className="w-4 h-4" /> Unblock User
                                                                </button>
                                                            </li>
                                                        ) : (
                                                            <li>
                                                                <button onClick={() => handleStatusChange(u._id, 'blocked', u.name)} className="text-warning">
                                                                    <FiLock className="w-4 h-4" /> Block User
                                                                </button>
                                                            </li>
                                                        )}
                                                        <div className="divider my-1"></div>
                                                        <li>
                                                            <button onClick={() => handleDeleteUser(u._id, u.name)} className="text-error">
                                                                <FiTrash2 className="w-4 h-4" /> Delete User
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-base-content/40 italic">You</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Role Legend */}
            <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-200">
                <h4 className="font-bold mb-4">Role Permissions</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-error/10 rounded-xl border border-error/20">
                        <div className="flex items-center gap-2 text-error font-semibold mb-2">
                            <FiShield /> Admin
                        </div>
                        <ul className="text-sm text-base-content/70 space-y-1">
                            <li>• Full platform access</li>
                            <li>• Manage all users</li>
                            <li>• View admin dashboard</li>
                            <li>• Delete any content</li>
                        </ul>
                    </div>
                    <div className="p-4 bg-warning/10 rounded-xl border border-warning/20">
                        <div className="flex items-center gap-2 text-warning font-semibold mb-2">
                            <FiUserCheck /> Seller
                        </div>
                        <ul className="text-sm text-base-content/70 space-y-1">
                            <li>• Create listings</li>
                            <li>• Manage own listings</li>
                            <li>• View seller dashboard</li>
                            <li>• Access analytics</li>
                        </ul>
                    </div>
                    <div className="p-4 bg-info/10 rounded-xl border border-info/20">
                        <div className="flex items-center gap-2 text-info font-semibold mb-2">
                            <FiUser /> User
                        </div>
                        <ul className="text-sm text-base-content/70 space-y-1">
                            <li>• Browse listings</li>
                            <li>• Place orders</li>
                            <li>• Manage profile</li>
                            <li>• View order history</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;
