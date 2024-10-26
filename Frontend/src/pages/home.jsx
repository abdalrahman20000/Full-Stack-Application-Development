import React, { useState,useEffect } from 'react';
import axios from 'axios';

const Home = () => {

    // const initialProducts = [
    //     {
    //         id: 1,
    //         name: "Laptop Pro X",
    //         price: 1299.99,
    //         category: "Electronics",
    //         description: "High-performance laptop with latest specifications",
    //         availability_status: true,
    //         created_at: "2024-01-15T10:00:00",
    //         updated_at: "2024-01-15T10:00:00"
    //     },
    //     {
    //         id: 2,
    //         name: "Wireless Headphones",
    //         price: 199.99,
    //         category: "Audio",
    //         description: "Premium wireless headphones with noise cancellation",
    //         availability_status: true,
    //         created_at: "2024-01-16T11:30:00",
    //         updated_at: "2024-01-16T11:30:00"
    //     },
    //     {
    //         id: 3,
    //         name: "Smart Watch",
    //         price: 299.99,
    //         category: "Wearables",
    //         description: "Feature-rich smartwatch with health tracking",
    //         availability_status: false,
    //         created_at: "2024-01-17T09:15:00",
    //         updated_at: "2024-01-17T09:15:00"
    //     }
    // ];

    const [initialProducts,setInitialProducts] = useState([]);

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



    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Featured Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {initialProducts.map(product => (
                    <div
                        key={product.id}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                    >
                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-blue-600">
                                ${product.price}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-sm ${product.availability_status
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                                }`}>
                                {product.availability_status ? 'Available' : 'Out of Stock'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;