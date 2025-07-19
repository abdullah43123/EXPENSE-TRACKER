import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiX } from 'react-icons/fi';

const incomeSchema = yup.object().shape({
  date: yup.date().required('Date is required'),
  description: yup.string().required('Description is required'),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .positive('Amount must be positive')
    .required('Amount is required'),
  source: yup.string().required('Source is required'),
});

const IncomeForm = ({ onSave, onCancel, sources = [] }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(incomeSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      source: sources[0] || '',
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    
    // onSave({
    //   ...data,
    //   amount: parseFloat(data.amount),
    // });
    // reset();
  };

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md">
      <button
        onClick={onCancel}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <FiX size={20} />
      </button>

      <h3 className="text-xl font-semibold text-gray-800 mb-6">Add Income</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              {...register('date')}
              className={`w-full p-2 border ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              } rounded focus:ring-emerald-500 focus:border-emerald-500`}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
              Source
            </label>
            <select
              id="source"
              {...register('source')}
              className={`w-full p-2 border ${
                errors.source ? 'border-red-500' : 'border-gray-300'
              } rounded focus:ring-emerald-500 focus:border-emerald-500`}
            >
              {sources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
            {errors.source && (
              <p className="mt-1 text-sm text-red-600">{errors.source.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            id="description"
            {...register('description')}
            className={`w-full p-2 border ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            } rounded focus:ring-emerald-500 focus:border-emerald-500`}
            placeholder="Salary, Bonus, etc."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              $
            </span>
            <input
              type="number"
              id="amount"
              step="0.01"
              {...register('amount')}
              className={`w-full pl-8 p-2 border ${
                errors.amount ? 'border-red-500' : 'border-gray-300'
              } rounded focus:ring-emerald-500 focus:border-emerald-500`}
              placeholder="0.00"
            />
          </div>
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
          >
            Add Income
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncomeForm;