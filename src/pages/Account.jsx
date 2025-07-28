import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import { useAuth } from '../hooks/useAuth';
import { FiUser, FiMail, FiLock, FiCreditCard, FiBell } from 'react-icons/fi';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  currentPassword: yup.string(),
  newPassword: yup.string().when('currentPassword', {
    is: val => val && val.length > 0,
    then: yup.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
  }),
});

const Account = () => {
  // const { user } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      // name: user?.name || '',
      // email: user?.email || ''
    }
  });



  const onSubmit = (data) => {
    console.log('Account updated:', data);
    // In a real app, you would update the user account here
    alert('Account updated successfully!');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Account Settings</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-6">Profile Information</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                type="text"
                {...register('name')}
                className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                {...register('email')}
                className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-medium mb-4">Change Password</h3>

            <div className="mb-4">
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="currentPassword"
                  type="password"
                  {...register('currentPassword')}
                  className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="newPassword"
                  type="password"
                  {...register('newPassword')}
                  className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              {errors.newPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              id="expense-alerts"
              type="checkbox"
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
            />
            <label htmlFor="expense-alerts" className="ml-2 block text-sm text-gray-700">
              <span className="font-medium">Expense alerts</span>
              <p className="text-gray-500">Receive notifications when you exceed budget categories</p>
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="weekly-reports"
              type="checkbox"
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              defaultChecked
            />
            <label htmlFor="weekly-reports" className="ml-2 block text-sm text-gray-700">
              <span className="font-medium">Weekly reports</span>
              <p className="text-gray-500">Get a summary of your weekly spending</p>
            </label>
          </div>

          <div className="flex items-center">
            <input
              id="monthly-reports"
              type="checkbox"
              className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              defaultChecked
            />
            <label htmlFor="monthly-reports" className="ml-2 block text-sm text-gray-700">
              <span className="font-medium">Monthly reports</span>
              <p className="text-gray-500">Receive detailed monthly financial reports</p>
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Save Preferences
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-6">Payment Methods</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <FiCreditCard className="h-6 w-6 text-gray-500 mr-3" />
              <div>
                <p className="font-medium">Visa ending in 4242</p>
                <p className="text-sm text-gray-500">Expires 04/2025</p>
              </div>
            </div>
            <button className="text-red-600 hover:text-red-800 text-sm font-medium">
              Remove
            </button>
          </div>

          <button
            type="button"
            className="w-full flex justify-center py-2 px-4 border border-dashed border-gray-300 rounded-md hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            <span className="text-emerald-600 font-medium">+ Add Payment Method</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;