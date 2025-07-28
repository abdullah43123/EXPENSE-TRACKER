import { useState } from 'react';
// import { BarChart, PieChart } from '../components/Charts';
// import { BarChart, PieChart } from 'recharts';
import ExpenseChart from '../components/ExpenseChart';
import CategoryPieChart from '../components/CategoryPieChart';
// import {
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend
// } from 'recharts';

const Reports = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [reportType, setReportType] = useState('expenses');

  // Sample data - in a real app, this would come from your backend
  const expenseData = [
    { month: 'Jan', amount: 1200 },
    { month: 'Feb', amount: 1900 },
    { month: 'Mar', amount: 1500 },
    { month: 'Apr', amount: 1800 },
    { month: 'May', amount: 2100 },
    { month: 'Jun', amount: 1900 },
    { month: 'Jul', amount: 1250 }
  ];

  const incomeData = [
    { month: 'Jan', amount: 3000 },
    { month: 'Feb', amount: 3200 },
    { month: 'Mar', amount: 3000 },
    { month: 'Apr', amount: 3100 },
    { month: 'May', amount: 3000 },
    { month: 'Jun', amount: 3200 },
    { month: 'Jul', amount: 3000 }
  ];

  const categories = [
    { name: 'Food', value: 35, color: '#10b981' },
    { name: 'Transport', value: 20, color: '#3b82f6' },
    { name: 'Housing', value: 25, color: '#f59e0b' },
    { name: 'Entertainment', value: 15, color: '#ef4444' },
    { name: 'Other', value: 5, color: '#8b5cf6' }
  ];

  const incomeSources = [
    { name: 'Salary', value: 80, color: '#10b981' },
    { name: 'Freelance', value: 15, color: '#3b82f6' },
    { name: 'Investments', value: 5, color: '#f59e0b' }
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Reports</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Financial Overview</h2>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="expenses">Expenses</option>
              <option value="income">Income</option>
              <option value="savings">Savings</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4">
              {reportType === 'expenses' ? 'Expenses Trend' : 
               reportType === 'income' ? 'Income Trend' : 'Savings Trend'}
            </h3>
            <div className="h-80">
              <ExpenseChart
              
                data={reportType === 'expenses' ? expenseData : incomeData} 
                dataKey={reportType === 'expenses' ? 'amount' : 'amount'}
                color={reportType === 'expenses' ? '#EF4444' : '#10B981'}
              />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4">
              {reportType === 'expenses' ? 'Expenses by Category' : 'Income by Source'}
            </h3>
            <div className="h-80">
              <CategoryPieChart
                data={reportType === 'expenses' ? categories : incomeSources} 
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <h4 className="text-sm font-medium text-gray-500">Total Income</h4>
              <p className="text-2xl font-bold text-emerald-600">$3,500</p>
              <p className="text-sm text-gray-500">+8% from last month</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h4 className="text-sm font-medium text-gray-500">Total Expenses</h4>
              <p className="text-2xl font-bold text-red-600">$1,250</p>
              <p className="text-sm text-gray-500">+5% from last month</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h4 className="text-sm font-medium text-gray-500">Savings</h4>
              <p className="text-2xl font-bold text-blue-600">$2,250</p>
              <p className="text-sm text-gray-500">28% of income</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;