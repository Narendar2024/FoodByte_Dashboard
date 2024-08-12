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
    const [showLogOut, setShowLogOut] = useState(false);
    const [showFirmTitle, setShowFirmTitle] = useState(true);

    useEffect(() => {
        const loginToken = localStorage.getItem('loginToken');
        if (loginToken) {
            setShowLogOut(true);
        }
    }, []);

    useEffect(() => {
        const firmName = localStorage.getItem('firmName');
        if (firmName) {
            setShowFirmTitle(false);
        }
    }, []);

    const logOutHandler = () => {
        confirm("Are you sure to logout?");
        localStorage.removeItem('firmId');
        localStorage.removeItem('loginToken');
        localStorage.removeItem('firmName');
        setShowLogOut(false);
        setShowFirmTitle(true);
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
        if (showLogOut) {
            setshowRegister(false);
            setShowLogin(false);
            setShowProduct(false);
            setShowFirm(true);
            setShowWelcome(false);
            setshowAllProducts(false);
        } else {
            alert("Please Login.");
            setShowLogin(true);
        }
    };

    const showProductHandler = () => {
        if (showLogOut) {
            setShowProduct(true);
            setShowFirm(false);
            setShowLogin(false);
            setshowRegister(false);
            setShowWelcome(false);
            setshowAllProducts(false);
        } else {
            alert("Please Login.");
            setShowLogin(true);
        }
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
        if (showLogOut) {
            setShowProduct(false);
            setShowFirm(false);
            setShowLogin(false);
            setshowRegister(false);
            setShowWelcome(false);
            setshowAllProducts(true);
        } else {
            alert("Please Login.");
            setShowLogin(true);
        }
    };


    return (
        <>
            <section className="landingSection">
                <Navbar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} showLogOut={showLogOut} logOutHandler={logOutHandler} />
                <div className="collectionSection">
                    <Sidebar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler} showAllProductsHandler={showAllProductsHandler}
                        showFirmTitle={showFirmTitle}
                    />
                    {showFirm && showLogOut && <AddFirm />}
                    {showProduct && showLogOut && <AddProduct />}
                    {showWelcome && <Welcome />}
                    {showAllProducts && showLogOut && <AllProducts />}
                    {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
                    {showRegister && <Register showLoginHandler={showLoginHandler} />}
                </div>
            </section>
        </>
    );
};

export default LandingPage;