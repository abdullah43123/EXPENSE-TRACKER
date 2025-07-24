import { FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

const Categories = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [categories, setCategories] = useState([]);

  // const { data: currentUser } = useQuery({
  //   queryKey: ['currentUser'],
  //   queryFn: CurrentUser,
  //   staleTime: 5 * 60 * 1000,
  //   cacheTime: 10 * 60 * 1000,
  //   refetchOnWindowFocus: false,
  // });

  // const mutation = useMutation({
  //   mutationFn: InsertCategories,
  //   onSuccess: (data) => {
  //     console.log('✅ Category inserted:', data);
  //     // optionally clear form or refetch categories list
  //   },
  //   onError: (error) => {
  //     console.error('❌ Error inserting category:', error.message);
  //   },
  // });

  // const { data: FilterData } = useQuery({
  //   queryKey: ['categories', currentUser?.id],
  //   queryFn: () => GetAllData({
  //     TableName: 'categories',
  //     ColName: 'userId',
  //     ColValue: currentUser.id
  //   }),
  //   enabled: !!currentUser?.id,
  //   staleTime: 5 * 60 * 1000,
  //   cacheTime: 10 * 60 * 1000,
  //   refetchOnWindowFocus: false,
  // });

  // useEffect(() => {
  //   if (FilterData?.length > 0) {
  //     setCategories(FilterData);
  //   }
  // }, [FilterData]);


  const [newCategory, setNewCategory] = useState({ name: '', budget: '', color: '#10B981' });

  const handleAddCategory = () => {
    // mutation.mutate({
    //   TableName : "categories",
    //   Name: newCategory.name,
    //   Budget: newCategory.budget,
    //   Color: newCategory.color,
    //   UserId: currentUser.id,
    // });

    if (newCategory.name && newCategory.budget) {
      setCategories([...categories, { ...newCategory, id: Date.now() }]);
      setNewCategory({ name: '', budget: '', color: '#10B981' });
      setIsAdding(false);
    }
  };



  // const deleteMutation = useMutation({
  //   mutationFn: ({ id }) =>
  //     DeleteData({
  //       TableName: 'categories',
  //       ColName: 'id',
  //       ColValue: id
  //     }),
  //   onSuccess: () => {
  //     console.log('✅ Deleted successfully');
  //     setCategories(categories.filter(cat => cat.id !== id));

  //     // queryClient.invalidateQueries(['categories']); // refetch list
  //   },
  //   onError: (error) => {
  //     console.error('❌ Delete failed:', error.message);
  //   },
  // });

  //   const handleDelete = (id) => {
  //     useMutation({
  //       mutationFn: () => DeleteData({
  //         TableName: "categories", 
  //         ColName: 'id',
  //         ColValue: id
  //       }),
  //     })
  // //     const deleteMutation = useMutation({
  // //   mutationFn: ({ id }) =>
  // //     DeleteData({
  // //       TableName: 'categories',
  // //       id: id,
  // //     }),
  // //   onSuccess: () => {
  // //     console.log('✅ Deleted successfully');
  // //     queryClient.invalidateQueries(['categories']); // refetch list
  // //   },
  // //   onError: (error) => {
  // //     console.error('❌ Delete failed:', error.message);
  // //   },
  // // });
  //     setCategories(categories.filter(cat => cat.id !== id));

  //   };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Categories</h1>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Categories</h2>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors"
          >
            <FiPlus className="mr-2" /> Add Category
          </button>
        </div>

        {isAdding && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-3">Add New Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Category name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly Budget</label>
                <input
                  type="number"
                  value={newCategory.budget}
                  onChange={(e) => setNewCategory({ ...newCategory, budget: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="$0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                <select
                  value={newCategory.color}
                  onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="#10B981">Green</option>
                  <option value="#3B82F6">Blue</option>
                  <option value="#F59E0B">Orange</option>
                  <option value="#EF4444">Red</option>
                  <option value="#8B5CF6">Purple</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
              >
                Save Category
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${category.budget}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className="inline-block w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    ></span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-emerald-600 hover:text-emerald-900 mr-3">
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate({ id: category.id })}
                      // onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Categories;