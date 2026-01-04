import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import { FiPackage, FiShoppingCart, FiDollarSign, FiTrendingUp } from "react-icons/fi";
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { StatCardSkeleton, TableSkeleton } from "../../components/ui/Skeleton";

const DashboardOverview = () => {
    const { user } = useContext(AuthContext);
    const [listings, setListings] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [listingsRes, ordersRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL}/my-listings?email=${user?.email}`),
                    axios.get(`${import.meta.env.VITE_API_URL}/my-orders?email=${user?.email}`)
                ]);
                setListings(listingsRes.data);
                setOrders(ordersRes.data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        if (user?.email) fetchData();
    }, [user]);

    // Calculate stats
    const totalListings = listings.length;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.price * order.quantity), 0);
    const freeAdoptions = listings.filter(l => l.price === 0).length;

    // Data for charts
    const categoryData = ['Pets', 'Pet Food', 'Accessories', 'Pet Care Products'].map(cat => ({
        name: cat,
        count: listings.filter(l => l.category === cat).length
    }));

    const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444'];

    const pieData = categoryData.filter(d => d.count > 0);

    // Monthly data (mock based on actual orders)
    const monthlyData = [
        { month: 'Jan', orders: 4, revenue: 120 },
        { month: 'Feb', orders: 6, revenue: 180 },
        { month: 'Mar', orders: 8, revenue: 240 },
        { month: 'Apr', orders: orders.length > 0 ? orders.length : 5, revenue: totalRevenue || 150 },
    ];

    const stats = [
        { 
            title: "Total Listings", 
            value: totalListings, 
            icon: <FiPackage className="w-8 h-8" />,
            color: "text-primary",
            bg: "bg-primary/10"
        },
        { 
            title: "Total Orders", 
            value: totalOrders, 
            icon: <FiShoppingCart className="w-8 h-8" />,
            color: "text-secondary",
            bg: "bg-secondary/10"
        },
        { 
            title: "Total Revenue", 
            value: `$${totalRevenue}`, 
            icon: <FiDollarSign className="w-8 h-8" />,
            color: "text-success",
            bg: "bg-success/10"
        },
        { 
            title: "Free Adoptions", 
            value: freeAdoptions, 
            icon: <FiTrendingUp className="w-8 h-8" />,
            color: "text-accent",
            bg: "bg-accent/10"
        },
    ];

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
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary to-secondary text-primary-content rounded-2xl p-8 shadow-xl">
                <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.displayName?.split(' ')[0]}! 👋</h1>
                <p className="opacity-90">Here's what's happening with your PawMart account today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
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
                {/* Bar Chart - Category Distribution */}
                <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-200">
                    <h3 className="text-xl font-bold mb-6">Listings by Category</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={categoryData}>
                            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis />
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: 'oklch(var(--b1))', 
                                    border: '1px solid oklch(var(--b3))',
                                    borderRadius: '12px'
                                }} 
                            />
                            <Bar dataKey="count" fill="oklch(var(--p))" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart - Category Distribution */}
                <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-200">
                    <h3 className="text-xl font-bold mb-6">Category Distribution</h3>
                    {pieData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="count"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-[300px] flex items-center justify-center text-base-content/50">
                            No data available yet
                        </div>
                    )}
                </div>
            </div>

            {/* Line Chart - Monthly Trends */}
            <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-200">
                <h3 className="text-xl font-bold mb-6">Monthly Trends</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: 'oklch(var(--b1))', 
                                border: '1px solid oklch(var(--b3))',
                                borderRadius: '12px'
                            }} 
                        />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="orders" stroke="oklch(var(--p))" strokeWidth={3} dot={{ r: 6 }} />
                        <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="oklch(var(--s))" strokeWidth={3} dot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-200">
                <h3 className="text-xl font-bold mb-6">Recent Orders</h3>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? orders.slice(0, 5).map((order, index) => (
                                <tr key={order._id || index}>
                                    <td className="font-medium">{order.productName}</td>
                                    <td>{order.quantity}</td>
                                    <td className="text-primary font-bold">${order.price}</td>
                                    <td>{order.date || 'N/A'}</td>
                                    <td>
                                        <span className="badge badge-success badge-sm">Confirmed</span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-8 text-base-content/50">
                                        No orders yet. Start exploring! 🛒
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

export default DashboardOverview;
