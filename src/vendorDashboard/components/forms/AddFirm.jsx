import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';


const AddFirm = () => {
    const [firmName, setFirmName] = useState("");
    const [area, setArea] = useState("");
    const [category, setCategory] = useState([]);
    const [region, setRegion] = useState([]);
    const [offer, setOffer] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);


    const handleCategoryChange = (event) => {
        const value = event.target.value;
        if (category.includes(value)) {
            setCategory(category.filter((item) => item !== value));
        } else {
            setCategory([...category, value]);
        }
    };
    const handleRegionChange = (event) => {
        const value = event.target.value;
        if (region.includes(value)) {
            setRegion(region.filter((item) => item !== value));
        } else {
            setRegion([...region, value]);
        }
    };

    const handleImageUpload = (event) => {
        const selectedImage = event.target.files[0];
        setFile(selectedImage);
    };

    const handleFirmSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const loginToken = localStorage.getItem('loginToken');
            if (!loginToken) {
                console.error("User not authenticated");
            }

            const formData = new FormData();
            formData.append('firmName', firmName);
            formData.append('area', area);
            formData.append('offer', offer);
            formData.append('image', file);

            category.forEach((value) => {
                formData.append('category', value);
            });
            region.forEach((value) => {
                formData.append('region', value);
            });

            const response = await fetch(`${API_URL}/firm/add-firm`, {
                method: 'POST',
                headers: {
                    'token': `${loginToken}`
                },
                body: formData
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                setFirmName("");
                setArea("");
                setCategory([]);
                setRegion([]);
                setOffer("");
                setFile(null);
                alert("Firm added Successfully");
            } else if (data.message === "vendor can have only one firm") {
                alert("Firm Exists 🥗. Only 1 firm can be added  ");
            } else {
                alert('Failed to add Firm');
            }

            const mango = data.firmId;
            const vendorRestuarant = data.vendorFirmName;

            localStorage.setItem('firmId', mango);
            localStorage.setItem('firmName', vendorRestuarant);
            window.location.reload();

        } catch (error) {
            console.error("failed to add Firm");
            alert("failed to add Firm");
        }
    };
    return (
        <div className="firmSection">
            <form className="tableForm" onSubmit={handleFirmSubmit}>
                <h3>Add Firm</h3>
                <label htmlFor="firmname">Firm Name:</label>
                <input type="text" name='firmName' value={firmName} onChange={(e) => setFirmName(e.target.value)} />
                <label htmlFor="area">Area:</label>
                <input type="text" name='area' value={area} onChange={(e) => setArea(e.target.value)} />

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

                <label htmlFor="offer">Offer:</label>
                <input type="text" name='offer' value={offer} onChange={(e) => setOffer(e.target.value)} />

                <div className="checkInp">
                    <label htmlFor="region">Region:</label>
                    <div className="inputsContainer">
                        <div className="regionBoxContainer">
                            <label htmlFor="south-indian">South-Indian:</label>
                            <input type="checkbox" value="south-indian" checked={region.includes('south-indian')} onChange={handleRegionChange} />
                        </div>

                        <div className="regionBoxContainer">
                            <label htmlFor="north-indian">North-Indian:</label>
                            <input type="checkbox" value="north-indian" checked={region.includes('north-indian')} onChange={handleRegionChange} />
                        </div>

                        <div className="regionBoxContainer">
                            <label htmlFor="chinese">Chinese:</label>
                            <input type="checkbox" value="chinese" checked={region.includes('chinese')} onChange={handleRegionChange} />
                        </div>

                        <div className="regionBoxContainer">
                            <label htmlFor="bakery">Bakery:</label>
                            <input type="checkbox" value="bakery" checked={region.includes('bakery')} onChange={handleRegionChange} />
                        </div>
                    </div>
                </div>


                <label htmlFor="image">Image:</label>
                <input type="file" onChange={handleImageUpload} /><br />
                <div className="btnSubmit">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddFirm;