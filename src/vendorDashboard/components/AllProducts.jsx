import React, { useState, useEffect } from 'react';
import { API_URL } from '../data/apiPath';

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    const productHandler = async () => {
        const firmId = localStorage.getItem('firmId');
        try {
            const response = await fetch(`${API_URL}/product/${firmId}/products`);
            const newProductsData = await response.json();
            setProducts(newProductsData.products);
            console.log(newProductsData.products);
        } catch (error) {
            console.error("Failed to fetch products", error);
            alert("Failed to fetch products");
        }
    };
    useEffect(() => {
        productHandler();
        // console.log("THis is useEffect");
    }, []);


    const deleteProductById = async (productId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");

        if (!isConfirmed) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/product/${productId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result.message); // Log success message for debugging
                setProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
                alert("Product Deleted Successfully");
            } else {
                const errorResult = await response.json();
                console.log('Failed to delete product:', errorResult.error); // Log error for debugging
                alert('Failed to delete product');
            }
        } catch (error) {
            console.error("Failed to delete product", error);
            alert('Failed to delete product');
        }
    };



    return (
        <div>
            {!products ? (
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
                    </thead>

                    <tbody>
                        {products.map((item) => {
                            return (

                                <tr key={item._id}>
                                    <td>{item.productName}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        {item.image && (
                                            <img src={`${API_URL}/uploads/${item.image}`} alt={item.productName}
                                                style={{ width: '50px', height: '50px' }}
                                            />
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={() => deleteProductById(item._id)}>Delete</button>
                                    </td>
                                </tr>

                            );
                        })}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AllProducts;