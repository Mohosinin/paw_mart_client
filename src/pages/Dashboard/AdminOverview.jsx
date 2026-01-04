import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { FiUsers, FiPackage, FiShoppingCart, FiShield, FiUserCheck, FiUser } from "react-icons/fi";
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import { StatCardSkeleton, TableSkeleton } from "../../components/ui/Skeleton";

const AdminOverview = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState(null);
    const [recentUsers, setRecentUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, usersRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL}/admin/stats`),
                    axios.get(`${import.meta.env.VITE_API_URL}/users`)
                ]);
                setStats(statsRes.data);
                setRecentUsers(usersRes.data.slice(0, 5));
            } catch (error) {
                console.error("Error fetching admin data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const COLORS = ['#6366f1', '#22c55e', '#f59e0b'];

    const roleData = stats ? [
        { name: 'Admins', value: stats.adminCount, icon: <FiShield /> },
        { name: 'Sellers', value: stats.sellerCount, icon: <FiUserCheck /> },
        { name: 'Users', value: stats.userCount, icon: <FiUser /> },
    ] : [];

    const statsCards = stats ? [
        { 
            title: "Total Users", 
            value: stats.totalUsers, 
            icon: <FiUsers className="w-8 h-8" />,
            color: "text-primary",
            bg: "bg-primary/10"
        },
        { 
            title: "Total Listings", 
            value: stats.totalListings, 
            icon: <FiPackage className="w-8 h-8" />,
            color: "text-secondary",
            bg: "bg-secondary/10"
        },
        { 
            title: "Total Orders", 
            value: stats.totalOrders, 
            icon: <FiShoppingCart className="w-8 h-8" />,
            color: "text-accent",
            bg: "bg-accent/10"
        },
        { 
            title: "Admins", 
            value: stats.adminCount, 
            icon: <FiShield className="w-8 h-8" />,
            color: "text-success",
            bg: "bg-success/10"
        },
    ] : [];

    if (loading) {
        return (
            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => <StatCardSkeleton key={i} />)}
                </div>
                <TableSkeleton rows={5} cols={4} />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Admin Welcome */}
            <div className="bg-gradient-to-r from-error to-warning text-error-content rounded-2xl p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-2">
                    <FiShield className="w-8 h-8" />
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                </div>
                <p className="opacity-90">Welcome back, {user?.displayName?.split(' ')[0]}! Manage your platform from here.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsCards.map((stat, index) => (
                    <div 
                        key={index} 
                        className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-200 hover:shadow-xl transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-base-content/60 text-sm font-medium">{stat.title}</p>
                                <p className="text-3xl font-black mt-1">{stat.value}</p>
                            </div>
                            <div className={`${stat.bg} ${stat.color} p-4 rounded-xl`}>
                                {stat.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Role Distribution Bar Chart */}
                <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-200">
                    <h3 className="text-xl font-bold mb-6">User Role Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={roleData}>
                            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: 'oklch(var(--b1))', 
                                    border: '1px solid oklch(var(--b3))',
                                    borderRadius: '12px'
                                }} 
                            />
                            <Bar dataKey="value" fill="oklch(var(--p))" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Role Distribution Pie Chart */}
                <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-200">
                    <h3 className="text-xl font-bold mb-6">Role Breakdown</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={roleData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {roleData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Users Table */}
            <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-200">
                <h3 className="text-xl font-bold mb-6">Recent Users</h3>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentUsers.length > 0 ? recentUsers.map((u, index) => (
                                <tr key={u._id || index}>
                                    <td className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="w-10 rounded-full">
                                                <img src={u.photo || "https://i.ibb.co/tYHpt12/avatar.png"} alt={u.name} />
                                            </div>
                                        </div>
                                        <span className="font-medium">{u.name || 'N/A'}</span>
                                    </td>
                                    <td className="text-base-content/70">{u.email}</td>
                                    <td>
                                        <span className={`badge badge-sm ${
                                            u.role === 'admin' ? 'badge-error' : 
                                            u.role === 'seller' ? 'badge-warning' : 'badge-info'
                                        }`}>
                                            {u.role || 'user'}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`badge badge-sm ${u.status === 'blocked' ? 'badge-error' : 'badge-success'}`}>
                                            {u.status || 'active'}
                                        </span>
                                    </td>
                                    <td className="text-base-content/60 text-sm">
                                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-8 text-base-content/50">
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
