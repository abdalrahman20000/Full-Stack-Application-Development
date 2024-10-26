import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit2, Trash2 } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
    const [initialProducts, setInitialProducts] = useState([]);
    const [products, setProducts] = useState(initialProducts);
    const [editingProduct, setEditingProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        category: '',
        availability_status: 'all', // 'all', 'available', 'out of stock'
        maxPrice: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/products");
                console.log(response.data);
                setInitialProducts(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    const initialFormState = {
        name: '',
        price: '',
        category: '',
        description: '',
        availability_status: true
    };

    const [formData, setFormData] = useState(initialFormState);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const filteredProducts = initialProducts.filter(product => {
        const matchesCategory = filters.category ? product.category === filters.category : true;
        const matchesAvailability = filters.availability_status === 'all' ||
            (filters.availability_status === 'available' && product.availability_status) ||
            (filters.availability_status === 'out of stock' && !product.availability_status);
        const matchesPrice = filters.maxPrice ? product.price <= filters.maxPrice : true;

        return matchesCategory && matchesAvailability && matchesPrice;
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingProduct) {
            setProducts(products.map(p =>
                p.id === editingProduct.id
                    ? {
                        ...p,
                        ...formData,
                        updated_at: new Date().toISOString()
                    }
                    : p
            ));
        } else {
            const newProduct = {
                ...formData,
                id: Math.max(...products.map(p => p.id)) + 1,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            setProducts([...products, newProduct]);
        }
        setIsModalOpen(false);
        setEditingProduct(null);
        setFormData(initialFormState);

        try {
            const response = await axios.post(`http://localhost:5000/api/add-product`, { formData });
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = async (product) => {
        setEditingProduct(product);
        setFormData(product);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`http://localhost:5000/api/delete-product/${id}`);
                setProducts(products.filter(p => p.id !== id));
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Product Dashboard</h1>
                <button
                    onClick={() => {
                        setEditingProduct(null);
                        setFormData(initialFormState);
                        setIsModalOpen(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                >
                    <PlusCircle size={20} />
                    Add Product
                </button>
            </div>

            {/* Filters */}
            <div className="mb-4 flex space-x-4">
                <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="border rounded-md p-2"
                >
                    <option value="">All Categories</option>
                    {Array.from(new Set(initialProducts.map(p => p.category))).map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <select
                    name="availability_status"
                    value={filters.availability_status}
                    onChange={handleFilterChange}
                    className="border rounded-md p-2"
                >
                    <option value="all">All Statuses</option>
                    <option value="available">Available</option>
                    <option value="out of stock">Out of Stock</option>
                </select>
                <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="Max Price"
                    className="border rounded-md p-2"
                />
            </div>

            {/* Product Table */}
            <div className="overflow-x-auto">
                <table className="w-full bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left">Name</th>
                            <th className="px-6 py-3 text-left">Price</th>
                            <th className="px-6 py-3 text-left">Category</th>
                            <th className="px-6 py-3 text-left">Status</th>
                            <th className="px-6 py-3 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id} className="border-t">
                                <td className="px-6 py-4">{product.name}</td>
                                <td className="px-6 py-4">${product.price}</td>
                                <td className="px-6 py-4">{product.category}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-sm ${product.availability_status
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}>
                                        {product.availability_status ? 'Available' : 'Out of Stock'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Edit2 size={20} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4">
                            {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        step="0.01"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Category</label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        rows="3"
                                        required
                                    />
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="availability_status"
                                        checked={formData.availability_status}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label className="ml-2 block text-sm text-gray-700">
                                        Available
                                    </label>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsModalOpen(false);
                                        setEditingProduct(null);
                                        setFormData(initialFormState);
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    {editingProduct ? 'Update' : 'Add'} Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
