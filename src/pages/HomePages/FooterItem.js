import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Footer = () => {
    return (
        <>
            <div className='footerBody pt-2 mx-auto'>
                <div className='secondPartFooter'>
                    <div className='d-flex justify-content-between align-items-center flex-lg-row pt-3 pb-3  handleFlex' style={{ color: "#a2a2a2" }}>
                        <div className='copyright'>
                            &copy; Copyright 2023 Kccb Mobile Apps
                        </div>
                        <div className='handleForWidth'>
                            <Link></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;