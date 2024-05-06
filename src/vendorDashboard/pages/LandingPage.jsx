import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';
import AddFirm from '../components/forms/AddFirm';
import AddProduct from '../components/forms/AddProduct';
import Welcome from '../components/Welcome';
import AllProducts from '../components/AllProducts';

const LandingPage = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setshowRegister] = useState(false);
    const [showFirm, setShowFirm] = useState(false);
    const [showProduct, setShowProduct] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const [showAllProducts, setshowAllProducts] = useState(false);
    const [showLogOut, setShowLogout] = useState(false);

    useEffect(() => {
        const loginToken = localStorage.getItem('loginToken');
        if (loginToken) {
            setShowLogout(true);
        }
    }, []);

    const logOutHandler = () => {
        localStorage.removeItem('firmId');
        localStorage.removeItem('loginToken');
        setShowLogout(false);
    };

    const showLoginHandler = () => {
        setShowLogin(true);
        setshowRegister(false);
        setShowFirm(false);
        setShowProduct(false);
        setShowWelcome(false);
        setshowAllProducts(false);
    };

    const showRegisterHandler = () => {
        setshowRegister(true);
        setShowLogin(false);
        setShowFirm(false);
        setShowProduct(false);
        setShowWelcome(false);
        setshowAllProducts(false);
    };

    const showFirmHandler = () => {
        setshowRegister(false);
        setShowLogin(false);
        setShowProduct(false);
        setShowFirm(true);
        setShowWelcome(false);
        setshowAllProducts(false);
    };

    const showProductHandler = () => {
        setShowProduct(true);
        setShowFirm(false);
        setShowLogin(false);
        setshowRegister(false);
        setShowWelcome(false);
        setshowAllProducts(false);
    };

    const showWelcomeHandler = () => {
        setShowProduct(false);
        setShowFirm(false);
        setShowLogin(false);
        setshowRegister(false);
        setShowWelcome(true);
        setshowAllProducts(false);
    };

    const showAllProductsHandler = () => {
        setShowProduct(false);
        setShowFirm(false);
        setShowLogin(false);
        setshowRegister(false);
        setShowWelcome(false);
        setshowAllProducts(true);
    };


    return (
        <>
            <section className="landingSection">
                <Navbar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} showLogOut={showLogOut} logOutHandler={logOutHandler} />
                <div className="collectionSection">
                    <Sidebar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler} showAllProductsHandler={showAllProductsHandler} />
                    {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
                    {showRegister && <Register showLoginHandler={showLoginHandler} />}
                    {showFirm && <AddFirm />}
                    {showProduct && <AddProduct />}
                    {showWelcome && <Welcome />}
                    {showAllProducts && <AllProducts />}
                </div>
            </section>
        </>
    );
};

export default LandingPage;