import StatCard from '../components/StatCard';
import CategoryPieChart from '../components/CategoryPieChart';
import ExpenseChart from '../components/ExpenseChart';
import RecentTransactions from '../components/RecentTransactions';

const Dashboard = () => {
  // Sample data - in a real app, this would come from your backend
  const stats = [
    { title: "Total Balance", value: "$5,280", change: "+12% from last month", icon: "💰" },
    { title: "Monthly Expenses", value: "$1,250", change: "+5% from last month", icon: "💸" },
    { title: "Monthly Income", value: "$3,500", change: "+8% from last month", icon: "📈" },
    { title: "Savings Rate", value: "28%", icon: "🏦" }
  ];

  const categories = [
    { name: 'Food', value: 35, color: '#10b981' },
    { name: 'Transport', value: 20, color: '#3b82f6' },
    { name: 'Housing', value: 25, color: '#f59e0b' },
    { name: 'Entertainment', value: 15, color: '#ef4444' },
    { name: 'Other', value: 5, color: '#8b5cf6' }
  ];

  const expensesData = [
    { month: 'Jan', expenses: 1200 },
    { month: 'Feb', expenses: 1900 },
    { month: 'Mar', expenses: 1500 },
    { month: 'Apr', expenses: 1800 },
    { month: 'May', expenses: 2100 },
    { month: 'Jun', expenses: 1900 },
    { month: 'Jul', expenses: 1250 }
  ];

  const transactions = [
    { id: 1, description: 'Grocery Shopping', amount: 85.50, category: 'Food', date: '2023-07-15' },
    { id: 2, description: 'Electric Bill', amount: 120.00, category: 'Housing', date: '2023-07-10' },
    { id: 3, description: 'Movie Tickets', amount: 28.00, category: 'Entertainment', date: '2023-07-08' },
    { id: 4, description: 'Gasoline', amount: 45.30, category: 'Transport', date: '2023-07-05' },
    { id: 5, description: 'Restaurant', amount: 65.80, category: 'Food', date: '2023-07-03' }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatCard 
            key={index}
            title={stat.title} 
            value={stat.value} 
            change={stat.change} 
            icon={stat.icon}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow col-span-2">
          <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
          <ExpenseChart data={expensesData} />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
          <CategoryPieChart data={categories} />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <RecentTransactions transactions={transactions} />
      </div>
    </div>
  );
};

export default Dashboard;