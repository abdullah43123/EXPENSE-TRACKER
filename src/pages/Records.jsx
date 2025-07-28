import { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiEdit, FiFilter } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { GetExpenseData, GetIncomeData } from '../lib/accounts';
import { AuthContext } from '../context/userContext';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Records = () => {
    // Static data for demonstration
    const { user } = useContext(AuthContext);
    const [staticExpenses, setStaticExpenses] = useState([])
    const [staticIncomes, setStaticIncomes] = useState([])
    const [monthlyData, setMonthlyData] = useState([]);

    const { data } = useQuery({
        queryKey: ['expenses', user],
        queryFn: () => GetExpenseData({ User: user }),
        enabled: !!user
    })

    const { data: IncomeData } = useQuery({
        queryKey: ['incomes', user],
        queryFn: () => GetIncomeData({ User: user }),
        enabled: !!user
    })

    useEffect(() => {
        if (data?.data?.users) {
            const formattedExpenses = data.data.users.map(expense => ({
                ...expense,
                date: expense.date.split('T')[0] // Extracts just the YYYY-MM-DD part
            }));
            setStaticExpenses(formattedExpenses);
        }
        if (IncomeData?.data?.users) {
            const formattedIncomes = IncomeData.data.users.map(income => ({
                ...income,
                date: income.date.split('T')[0]
            }));
            setStaticIncomes(formattedIncomes);
        }
    }, [data, IncomeData])

    useEffect(() => {
        MonthData()
    }, [staticExpenses, staticIncomes])

    function MonthData() {
        const monthlyData1 = generateMonthlySummary(staticExpenses, staticIncomes)
        console.log(monthlyData1);
        setMonthlyData(monthlyData1)
    }

    const [activeTab, setActiveTab] = useState('expenses');
    const [showFilter, setShowFilter] = useState(false);
    const [dateRange, setDateRange] = useState({
        start: '2025-07-01',
        end: '2025-07-25'
    });

    // Filter data based on date range
    const filteredExpenses = staticExpenses.filter(expense => {
        return expense.date >= dateRange.start && expense.date <= dateRange.end;
    });

    const filteredIncomes = staticIncomes.filter(income => {
        return income.date >= dateRange.start && income.date <= dateRange.end;
    });

    // Prepare data for charts
    const expenseByCategory = filteredExpenses.reduce((acc, expense) => {
        const existing = acc.find(item => item.name === expense.category);
        if (existing) {
            existing.value += expense.amount;
        } else {
            acc.push({ name: expense.category, value: expense.amount });
        }
        return acc;
    }, []);

    const incomeBySource = filteredIncomes.reduce((acc, income) => {
        const existing = acc.find(item => item.name === income.source);
        if (existing) {
            existing.value += income.amount;
        } else {
            acc.push({ name: income.source, value: income.amount });
        }
        return acc;
    }, []);

    function generateMonthlySummary(expenses, incomes) {
        // Create a map to store monthly data
        const monthlySummary = new Map();

        // Process expenses
        expenses.forEach(expense => {
            const date = new Date(expense.date);
            const monthYear = date.toLocaleString('default', { month: 'short' }); // e.g. "Jul"

            if (!monthlySummary.has(monthYear)) {
                monthlySummary.set(monthYear, {
                    name: monthYear,
                    expenses: 0,
                    incomes: 0
                });
            }

            const monthData = monthlySummary.get(monthYear);
            monthData.expenses += expense.amount;
        });

        // Process incomes
        incomes.forEach(income => {
            const date = new Date(income.date);
            const monthYear = date.toLocaleString('default', { month: 'short' }); // e.g. "Jul"

            if (!monthlySummary.has(monthYear)) {
                monthlySummary.set(monthYear, {
                    name: monthYear,
                    expenses: 0,
                    incomes: 0
                });
            }

            const monthData = monthlySummary.get(monthYear);
            monthData.incomes += income.amount;
        });

        // Convert map to array and sort by date
        const result = Array.from(monthlySummary.values());
        result.sort((a, b) => {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return months.indexOf(a.name) - months.indexOf(b.name);
        });

        return result;
    }
    const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444', '#8B5CF6'];

    return (
        <div className="p-4 md:p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Financial Records</h1>

            {/* Date Range Filter */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Date Range Filter</h2>
                    <button
                        onClick={() => setShowFilter(!showFilter)}
                        className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
                    >
                        <FiFilter className="mr-2" /> {showFilter ? 'Hide Filter' : 'Show Filter'}
                    </button>
                </div>

                {showFilter && (
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                            <input
                                type="date"
                                value={dateRange.start}
                                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                            <input
                                type="date"
                                value={dateRange.end}
                                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                                className="w-full p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={() => setShowFilter(false)}
                                className="w-full px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                            >
                                Apply Filter
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500 font-medium">Total Expenses</h3>
                    <p className="text-2xl font-bold text-red-500">
                        ${filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0)}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500 font-medium">Total Income</h3>
                    <p className="text-2xl font-bold text-emerald-500">
                        ${filteredIncomes.reduce((sum, inc) => sum + inc.amount, 0)}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="text-gray-500 font-medium">Net Balance</h3>
                    <p className="text-2xl font-bold">
                        ${filteredIncomes.reduce((sum, inc) => sum + inc.amount, 0) -
                            filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0)}
                    </p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-4">Financial Overview</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="h-80">
                        <h3 className="text-lg font-medium text-center mb-2">Monthly Comparison</h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={monthlyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="incomes" fill="#10B981" name="Income" />
                                <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="h-80">
                        <h3 className="text-lg font-medium text-center mb-2">
                            {activeTab === 'expenses' ? 'Expenses by Category' : 'Income by Source'}
                        </h3>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={activeTab === 'expenses' ? expenseByCategory : incomeBySource}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="name"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {expenseByCategory.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Tabs for Expenses/Income */}
            <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                <div className="flex border-b">
                    <button
                        className={`px-4 py-3 font-medium ${activeTab === 'expenses' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('expenses')}
                    >
                        Expenses
                    </button>
                    <button
                        className={`px-4 py-3 font-medium ${activeTab === 'incomes' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-600'}`}
                        onClick={() => setActiveTab('incomes')}
                    >
                        Income
                    </button>
                </div>

                <div className="p-4">
                    {activeTab === 'expenses' ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredExpenses.map((expense) => (
                                        <tr key={expense.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{expense.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.description}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.category}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 font-medium">-${expense.amount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-emerald-600 hover:text-emerald-900 mr-3">
                                                    <FiEdit />
                                                </button>
                                                <button className="text-red-600 hover:text-red-900">
                                                    <FiTrash2 />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredIncomes.map((income) => (
                                        <tr key={income.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{income.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{income.description}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{income.source}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-500 font-medium">+${income.amount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button className="text-emerald-600 hover:text-emerald-900 mr-3">
                                                    <FiEdit />
                                                </button>
                                                <button className="text-red-600 hover:text-red-900">
                                                    <FiTrash2 />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Records;