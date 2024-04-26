import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';
import AddFirm from '../components/forms/AddFirm';
import AddProduct from '../components/forms/AddProduct';
import Welcome from '../components/Welcome';

const LandingPage = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setshowRegister] = useState(false);
    const [showFirm, setShowFirm] = useState(false);
    const [showProduct, setShowProduct] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);

    const showLoginHandler = () => {
        setShowLogin(true);
        setshowRegister(false);
        setShowFirm(false);
        setShowProduct(false);
        setShowWelcome(false);
    };

    const showRegisterHandler = () => {
        setshowRegister(true);
        setShowLogin(false);
        setShowFirm(false);
        setShowProduct(false);
        setShowWelcome(false);
    };

    const showFirmHandler = () => {
        setshowRegister(false);
        setShowLogin(false);
        setShowProduct(false);
        setShowFirm(true);
        setShowWelcome(false);
    };

    const showProductHandler = () => {
        setShowProduct(true);
        setShowFirm(false);
        setShowLogin(false);
        setshowRegister(false);
        setShowWelcome(false);
    };

    const showWelcomeHandler = () => {
        setShowProduct(false);
        setShowFirm(false);
        setShowLogin(false);
        setshowRegister(false);
        setShowWelcome(true);

    };


    return (
        <>
            <section className="landingSection">
                <Navbar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler} />
                <div className="collectionSection">
                    <Sidebar showFirmHandler={showFirmHandler} showProductHandler={showProductHandler} />
                    {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
                    {showRegister && <Register showLoginHandler={showLoginHandler} />}
                    {showFirm && <AddFirm />}
                    {showProduct && <AddProduct />}
                    {showWelcome && <Welcome />}
                </div>
            </section>
        </>
    );
};

export default LandingPage;