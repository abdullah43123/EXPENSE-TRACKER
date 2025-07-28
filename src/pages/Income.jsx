import { FiPlus, FiFilter, FiDownload } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../context/userContext';
import IncomeForm from '../components/IncomeForm';
import { GetIncomeData } from '../lib/accounts';
// import { CurrentUser } from '../lib/user';
// import { GetAllData } from '../lib/accounts';
const Income = () => {
  const { user } = useContext(AuthContext)
  const [income, setIncome] = useState([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['expenses', user],
    queryFn: () => GetIncomeData({ User: user }),
    enabled: !!user,

  });

  useEffect(() => {
    if (data?.data?.users) {
      setIncome(data.data.users);
    }
  }, [data])


  const [isAdding, setIsAdding] = useState(false);
  const [filters, setFilters] = useState({
    source: '',
    dateFrom: '',
    dateTo: ''
  });


  const filteredIncome = income.filter(item => {
    return (
      (filters.source === '' || item.source === filters.source) &&
      (filters.dateFrom === '' || item.date >= filters.dateFrom) &&
      (filters.dateTo === '' || item.date <= filters.dateTo)
    );
  });

  const sources = [...new Set(income.map(item => item.source))];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Income</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Your Income</h2>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            {/* Filter Button */}
            <button
              className="flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 text-sm sm:text-base"
            >
              <FiFilter className="mr-1 sm:mr-2" />
              <span className=" xs:inline">Filter</span>
            </button>

            {/* Export Button */}
            <button
              className="flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 text-sm sm:text-base"
            >
              <FiDownload className="mr-1 sm:mr-2" />
              <span className="xs:inline">Export</span>
            </button>

            {/* Add Income Button (Primary) */}
            <button
              onClick={() => setIsAdding(true)}
              className="flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm sm:text-base"
            >
              <FiPlus className="mr-1 sm:mr-2" />
              <span className="xs:inline">Add Income</span>
            </button>
          </div>
        </div>

        {isAdding && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <IncomeForm
              onCancel={() => setIsAdding(false)}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
            <select
              value={filters.source}
              onChange={(e) => setFilters({ ...filters, source: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="">All Sources</option>
              {sources.map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredIncome.map((item) => (
                <tr key={item._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.source}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-600 text-right">
                    +${item.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50">
                <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                  Total:
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-emerald-600 text-right">
                  +${filteredIncome.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Income;