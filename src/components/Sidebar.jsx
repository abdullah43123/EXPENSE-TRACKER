import { NavLink } from 'react-router-dom';
import {
  FiHome,
  FiDollarSign,
  FiTrendingUp,
  FiPieChart,
  FiTag,
  FiUser,
  FiLogOut
} from 'react-icons/fi';

const Sidebar = ({ logout }) => {
  // console.log(isActive);

  return (
    <>
      {/* Desktop Sidebar (Left) */}
      <div className="hidden md:flex md:flex-col md:w-64 bg-emerald-700/80 backdrop-blur-md text-white p-4">
        <div className="mb-8 p-4">
          <h1 className="text-2xl font-bold">Track Expenses</h1>
          <p className="text-emerald-200">Personal Finance</p>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-emerald-800/80 ' : 'hover:bg-emerald-600/80'}`
                }
              >
                <FiHome className="mr-3" />
                Dashboard
                {/* <span className="hidden md:inline">Dashboard</span> */}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="expenses"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-emerald-800' : 'hover:bg-emerald-600'}`
                }
              >
                <FiDollarSign className="mr-3" />
                Expenses
              </NavLink>
            </li>
            <li>
              <NavLink
                to="income"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-emerald-800' : 'hover:bg-emerald-600'}`
                }
              >
                <FiTrendingUp className="mr-3" />
                Income
              </NavLink>
            </li>
            <li>
              <NavLink
                to="records"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-emerald-800' : 'hover:bg-emerald-600'}`
                }
              >
                <FiTag className="mr-3" />
                Records
              </NavLink>
            </li>
            <li>
              <NavLink
                to="account"
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-emerald-800' : 'hover:bg-emerald-600'}`
                }
              >
                <FiUser className="mr-3" />
                Account
              </NavLink>
            </li>


          </ul>
        </nav>

        <button
          onClick={logout}
          className="flex items-center p-3 text-emerald-200 hover:text-white hover:bg-emerald-600/80 rounded-lg transition-colors"
        >
          <FiLogOut className="mr-3" />
          <span className="hidden md:inline">Logout</span>
        </button>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed md:hidden bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700 z-50">
        <div className="flex justify-around items-center p-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-lg transition-colors ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400'}`
            }
          >
            <FiHome className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </NavLink>

          <NavLink
            to="expenses"
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-lg transition-colors ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400'}`
            }
          >
            <FiDollarSign className="h-5 w-5" />
            <span className="text-xs mt-1">Expenses</span>
          </NavLink>

          <NavLink
            to="income"
            className={({ isActive }) =>
              `flex flex-col items-center p-2 rounded-lg transition-colors ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400'}`
            }
          >
            <FiTrendingUp className="h-5 w-5" />
            <span className="text-xs mt-1">Income</span>
          </NavLink>


          <div className="relative group">
            <button className="flex flex-col items-center p-2 rounded-lg text-gray-600 dark:text-gray-400">
              <FiUser className="h-5 w-5" />
              <span className="text-xs mt-1">More</span>
            </button>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-white/90 dark:bg-gray-700/90 backdrop-blur-md rounded-lg shadow-lg p-2 w-40">
              <NavLink
                to="records"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded transition-colors ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'}`
                }
              >
                <FiTag className="mr-2 h-4 w-4" />
                <span>Records</span>
              </NavLink>
              <NavLink
                to="account"
                className={({ isActive }) =>
                  `flex items-center p-2 rounded transition-colors ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600'}`
                }
              >
                <FiUser className="mr-2 h-4 w-4" />
                <span>Account</span>
              </NavLink>
              <button
                onClick={logout}
                className="flex items-center w-full p-2 rounded text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <FiLogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;