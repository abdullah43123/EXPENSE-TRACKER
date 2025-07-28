import StatCard from '../components/StatCard';
import CategoryPieChart from '../components/CategoryPieChart';
import ExpenseChart from '../components/ExpenseChart';
import RecentTransactions from '../components/RecentTransactions';
import { GetExpenseData, GetIncomeData } from '../lib/accounts';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { AuthContext } from '../context/userContext';
import { useQuery } from '@tanstack/react-query';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);


  const { data, isLoading, error } = useQuery({
    queryKey: ['income', user],
    queryFn: () => GetIncomeData({ User: user }),
    enabled: !!user,

  });

  useEffect(() => {
    if (data?.data?.users) {
      setIncome(data.data.users);
    }
  }, [data])


  const { data: ExpenseData } = useQuery({
    queryKey: ['expenses', user],
    queryFn: () => GetExpenseData({ User: user }),
    enabled: !!user,

  });

  const categor = [...new Set(expenses.map(item => item.category))];


  useEffect(() => {
    if (ExpenseData?.data?.users) {
      setExpenses(ExpenseData.data.users);
    }
  }, [ExpenseData])

  useEffect(() => {


    GetStatsData()
  }, [income, expenses])

  function GetStatsData() {
    const stats1 = generateFinancialStats(expenses, income);
    const monthlyExpenses1 = generateMonthlyExpenses(expenses);
    setExpensesData(monthlyExpenses1)
    setStats(stats1)
  }

  function generateFinancialStats(expenses, incomes) {
    // Calculate totals for current month
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Filter current month's data
    const currentMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth &&
        expenseDate.getFullYear() === currentYear;
    });

    const currentMonthIncomes = incomes.filter(income => {
      const incomeDate = new Date(income.date);
      return incomeDate.getMonth() === currentMonth &&
        incomeDate.getFullYear() === currentYear;
    });

    // Calculate current month totals
    const monthlyExpenses = currentMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const monthlyIncome = currentMonthIncomes.reduce((sum, inc) => sum + inc.amount, 0);
    const totalBalance = monthlyIncome - monthlyExpenses;
    const savingsRate = monthlyIncome > 0 ? Math.round((totalBalance / monthlyIncome) * 100) : 0;

    // Calculate previous month totals for comparison
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const prevMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === prevMonth &&
        expenseDate.getFullYear() === prevYear;
    }).reduce((sum, exp) => sum + exp.amount, 0);

    const prevMonthIncomes = incomes.filter(income => {
      const incomeDate = new Date(income.date);
      return incomeDate.getMonth() === prevMonth &&
        incomeDate.getFullYear() === prevYear;
    }).reduce((sum, inc) => sum + inc.amount, 0);

    // Calculate percentage changes
    const expensesChange = prevMonthExpenses !== 0
      ? Math.round(((monthlyExpenses - prevMonthExpenses) / prevMonthExpenses) * 100)
      : 0;

    const incomeChange = prevMonthIncomes !== 0
      ? Math.round(((monthlyIncome - prevMonthIncomes) / prevMonthIncomes) * 100)
      : 0;

    const prevMonthBalance = prevMonthIncomes - prevMonthExpenses;
    const balanceChange = prevMonthBalance !== 0
      ? Math.round(((totalBalance - prevMonthBalance) / prevMonthBalance) * 100)
      : 0;

    // Format values with USD and percentage signs
    // const formatCurrency = (amount) => {
    //   return new Intl.NumberFormat('en-US', {
    //     style: 'currency',
    //     currency: 'USD',
    //     maximumFractionDigits: 0
    //   }).format(amount);
    // };

    return [
      {
        title: "Total Balance",
        // value: formatCurrency(totalBalance),
        value: totalBalance,
        change: `${balanceChange >= 0 ? '+' : ''}${balanceChange}% from last month`,
        icon: "💰"
      },
      {
        title: "Monthly Expenses",
        // value: formatCurrency(monthlyExpenses),
        value: monthlyExpenses,
        change: `${expensesChange >= 0 ? '+' : ''}${expensesChange}% from last month`,
        icon: "💸"
      },
      {
        title: "Monthly Income",
        // value: formatCurrency(monthlyIncome),
        value: monthlyIncome,
        change: `${incomeChange >= 0 ? '+' : ''}${incomeChange}% from last month`,
        icon: "📈"
      },
      {
        title: "Savings Rate",
        value: `${savingsRate}%`,
        change: "",
        icon: "🏦"
      }
    ];
  }

  const categories = [
    { name: categor.name != undefined ? categor[0] : "", value: 35, color: '#10b981' },
    { name: categor.name != undefined ? categor[1] : "", value: 35, color: '#3b82f6' },
    { name: categor.name != undefined ? categor[2] : "", value: 35, color: '#f59e0b' },
    { name: categor.name != undefined ? categor[3] : "", value: 35, color: '#ef4444' },
    { name: categor.name != undefined ? categor[4] : "", value: 35, color: '#8b5cf6' },
  ];

  function generateMonthlyExpenses(expenses) {
    // Create a map to store monthly expenses
    const monthlyExpensesMap = new Map();

    // Process each expense
    expenses.forEach(expense => {
      const date = new Date(expense.date);
      const month = date.toLocaleString('default', { month: 'short' }); // e.g. "Jan", "Feb"

      // Initialize if month doesn't exist
      if (!monthlyExpensesMap.has(month)) {
        monthlyExpensesMap.set(month, {
          month: month,
          expenses: 0
        });
      }

      // Add to the monthly total
      const monthData = monthlyExpensesMap.get(month);
      monthData.expenses += expense.amount;
    });

    // Convert map to array
    let result = Array.from(monthlyExpensesMap.values());

    // Sort by month in chronological order
    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    result = result.sort((a, b) => {
      return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
    });

    return result;
  }

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
        <RecentTransactions transactions={expenses} />
      </div>
    </div>
  );
};

export default Dashboard;