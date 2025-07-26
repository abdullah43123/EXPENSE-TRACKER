import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { InsertIncomeData } from '../lib/accounts';
import { useContext } from 'react';
import { AuthContext } from '../context/userContext';
import { FiX } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { useState } from 'react';

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

const IncomeForm = ({ onCancel }) => {
  const [isPending, setIsPending] = useState(false)
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(incomeSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      source: "Salary"
    },
  });

  const mutation = useMutation({
    mutationFn: InsertIncomeData,
    onSuccess: (data) => {

      queryClient.invalidateQueries(['expenses']);

    },
    onError: (error) => {
      Swal.fire({
        title: `${error.message}`,
        icon: "error",
        draggable: true
      });
    }
  });

  const onSubmit = (data) => {
    const FormData = {
      date: data.date,
      description: data.description,
      amount: data.amount,
      source: data.source,
      userId: user
    };
    try {
      mutation.mutate({ formData: FormData });
      Swal.fire({
        title: "Income Added",
        icon: "success",
        draggable: true
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        icon: "error",
        draggable: true
      });
    } finally {
      reset();
      onCancel();
    }
  }
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
              className={`w-full p-2 border ${errors.date ? 'border-red-500' : 'border-gray-300'
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
              className={`w-full p-2 border ${errors.source ? 'border-red-500' : 'border-gray-300'
                } rounded focus:ring-emerald-500 focus:border-emerald-500`}
            >
              <option value="Salary">Salary</option>
              <option value="Bonus">Bonus</option>
              <option value="Commission">Commission</option>
              <option value="Other">Other</option>
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
            className={`w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'
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
              className={`w-full pl-8 p-2 border ${errors.amount ? 'border-red-500' : 'border-gray-300'
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
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 flex items-center justify-center gap-2"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Add Income'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncomeForm;