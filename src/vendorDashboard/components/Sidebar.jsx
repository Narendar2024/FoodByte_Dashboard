import React from 'react';

const Sidebar = ({ showFirmHandler, showProductHandler, showAllProductsHandler }) => {
    return (
        <div className="sidebarSection">
            <ul>
                <li onClick={showFirmHandler}>Add Firm</li>
                <li onClick={showProductHandler}>Add Product</li>
                <li onClick={showAllProductsHandler}>All Products</li>
                <li>User Details</li>
            </ul>
        </div>
    );
};

export default Sidebar;