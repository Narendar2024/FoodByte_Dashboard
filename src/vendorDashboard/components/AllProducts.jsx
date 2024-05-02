import React, { useState, useEffect } from 'react';
// import API_URL from '../data/apiPath';
import { API_URL } from '../data/apiPath';

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    const productHandler = async () => {
        const firmId = localStorage.getItem('firmId');
        try {
            const response = await fetch(`${API_URL}/product/${firmId}/products`);
            const newProductsData = await response.json();
            setProducts(newProductsData);
            console.log(newProductsData);
        } catch (error) {
            console.error("Failed to fetch products", error);
            alert("Failed to fetch products");
        }
    };
    useEffect(() => {
        productHandler();
        console.log("THis is useEffect");
    }, []);
    return (
        <div>
            {products.length === 0 ? (
                <p>No Products added</p>
            ) : (
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Delete</th>
                        </tr>
                        <tbody>
                            {products.map((item) => {
                                return (
                                    <>
                                        <tr key={item._id}>
                                            <td>{item.productName}</td>
                                            <td>{item.price}</td>
                                            <td>
                                                {item.image && (
                                                    <img src={`${API_URL}/uploads/${item.image}`} alt={item.productName} />
                                                )}
                                            </td>
                                            <td>
                                                <button>Delete</button>
                                            </td>
                                        </tr>
                                    </>
                                );
                            })}
                        </tbody>
                    </thead>
                </table>
            )}
        </div>
    );
};

export default AllProducts;