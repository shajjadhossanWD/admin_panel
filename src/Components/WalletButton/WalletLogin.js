import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DSLCommerceContext } from '../../contexts/DSLCommerceContext';

import './WalletLogin.css'

const WalletLogin = () => {
    const navigate = useNavigate()
    const { user,
        openWalletModal,
        logOut,
        closeWalletModal,
        closeCoinbaseModal, } = useContext(DSLCommerceContext);

    const [checkDevice, setCheckDevice] = useState("");

    useEffect(() => {
        const detecting = async () => {
            if (window.innerWidth < 1000 && typeof window.ethereum === "undefined") {
                console.log("mobile");
                setCheckDevice(() => "mobileWithoutApp");
            } else if (
                window.innerWidth < 1000 &&
                typeof window.ethereum !== "undefined"
            ) {
                setCheckDevice(() => "mobileWithApp");
            } else if (
                window.innerWidth > 1000 &&
                typeof window.ethereum !== "undefined"
            ) {
                console.log("pc");
                setCheckDevice(() => "pcWithExtention");
            } else if (
                window.innerWidth > 1000 &&
                typeof window.ethereum === "undefined"
            ) {
                setCheckDevice(() => "pcWithoutExtention");
            }
        };

        detecting();
    }, []);

    return (
        <div>
            <div>
                {checkDevice === "mobileWithoutApp" && (
                    <a
                        href="https://metamask.app.link/dapp/http://testnet.dslcommerce.com"
                        target={"_blank"}
                        className="text-decoration-none"
                    >
                        <button className="text-uppercase button-metamask  px-5">
                            <img
                                className="me-2"
                                width="20px"
                                src="https://i.ibb.co/CBj8VVQ/af0137fd-42ad-4ca5-9e6c-3e8595fa77e2.jpg"
                                alt=""
                            />{" "}
                            Open in metamask
                        </button>
                    </a>
                )}
                {checkDevice === "mobileWithApp" && (
                    <>
                        {!user.walletAddress ||
                            user.walletAddress === "undefined" ? (
                            <button
                                className="text-uppercase button-metamask px-5"
                                onClick={() => openWalletModal()}
                            >
                                {" "}
                                <img
                                    className="me-2"
                                    width="20px"
                                    src="https://i.ibb.co/CBj8VVQ/af0137fd-42ad-4ca5-9e6c-3e8595fa77e2.jpg"
                                    alt=""
                                />{" "}
                                Connect to metamask
                            </button>
                        ) : (
                            <button
                                className="text-uppercase button-metamask px-5"
                                onClick={() => navigate("/profile")}
                            >
                                {" "}
                                <img
                                    className="me-2"
                                    width="20px"
                                    src="https://i.ibb.co/CBj8VVQ/af0137fd-42ad-4ca5-9e6c-3e8595fa77e2.jpg"
                                    alt=""
                                />{" "}
                                profile
                            </button>
                        )}
                    </>
                )}
                {checkDevice === "pcWithExtention" && (
                    <>
                        {!user.walletAddress ||
                            user.walletAddress === "undefined" ? (
                            <button
                                className="text-uppercase button-metamask px-5"
                                onClick={() => openWalletModal()}
                            >
                                {" "}
                                <img
                                    className="me-2"
                                    width="20px"
                                    src="https://i.ibb.co/CBj8VVQ/af0137fd-42ad-4ca5-9e6c-3e8595fa77e2.jpg"
                                    alt=""
                                />{" "}
                                Connect to metamask
                            </button>
                        ) : (
                            <button
                                className="text-uppercase button-metamask px-5"
                                onClick={() => navigate("/profile")}
                            >
                                {" "}
                                <img
                                    className="me-2"
                                    width="20px"
                                    src="https://i.ibb.co/CBj8VVQ/af0137fd-42ad-4ca5-9e6c-3e8595fa77e2.jpg"
                                    alt=""
                                />{" "}
                                profile
                            </button>
                        )}
                    </>
                )}
                {checkDevice === "pcWithoutExtention" && (
                    <a
                        href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
                        target={"_blank"}
                        className="text-decoration-none"
                    >
                        <button className="text-uppercase button-metamask px-5">
                            <img
                                className="me-2"
                                width="20px"
                                src="https://i.ibb.co/CBj8VVQ/af0137fd-42ad-4ca5-9e6c-3e8595fa77e2.jpg"
                                alt=""
                            />{" "}
                            INSTALL METAMASK
                        </button>
                    </a>
                )}
            </div>
        </div>
    );
};

export default WalletLogin;