import React, { useState } from 'react';

import { API_URL } from '../../data/apiPath';

const AddProduct = () => {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState([]);
    const [bestSeller, setBestSeller] = useState(false);
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");


    const handleCategoryChange = (event) => {
        const value = event.target.value;
        if (category.includes(value)) {
            setCategory(category.filter((item) => item !== value));
        } else {
            setCategory([...category, value]);
        }
    };

    const handleBestSeller = (event) => {
        const value = event.target.value === 'true';
        setBestSeller(value);

    };

    const handleImageUpload = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const loginToken = localStorage.getItem('loginToken');
            const firmId = localStorage.getItem('firmId');

            if (!loginToken || !firmId) {
                console.error("User Not Authenticated");
                return;
            }

            const formData = new FormData();
            formData.append('productName', productName);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('image', image);

            category.forEach((value) => {
                formData.append('category', value);
            });

            const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (response.ok) {
                alert("Product Added Successfully");
            }

            setProductName("");
            setPrice("");
            setCategory([]);
            setBestSeller(false);
            setImage(null);
            setDescription("");

        } catch (error) {
            console.error(error.message);
            alert("Failed to Add Product");
        }

    };

    return (
        <div className="firmSection">
            <form className="tableForm" onSubmit={handleAddProduct}>
                <h3>Add Product</h3>
                <label htmlFor="firmname">Product Name:</label>
                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
                <label htmlFor="area">Price:</label>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />

                <div className="checkInp">
                    <label htmlFor="category">Category:</label>
                    <div className="inputsContainer">
                        <div className="checkboxContainer">
                            <label htmlFor="veg">Veg:</label>
                            <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={handleCategoryChange} />
                        </div>

                        <div className="checkboxContainer">
                            <label htmlFor="non-veg">Non-Veg:</label>
                            <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange} />
                        </div>
                    </div>
                </div>

                <div className="checkInp">
                    <label htmlFor="category">Best Seller:</label>
                    <div className="inputsContainer">
                        <div className="checkboxContainer">
                            <label htmlFor="yes">Yes</label>
                            <input type="radio" value='true' checked={bestSeller === true} onChange={handleBestSeller} />
                        </div>

                        <div className="checkboxContainer">
                            <label htmlFor="no">No</label>
                            <input type="radio" value='false' checked={bestSeller === false} onChange={handleBestSeller} />
                        </div>
                    </div>
                </div>


                <label htmlFor="offer">Description:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                <label htmlFor="image">Firm Image:</label>
                <input type="file" onChange={handleImageUpload} /><br />
                <div className="btnSubmit">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;