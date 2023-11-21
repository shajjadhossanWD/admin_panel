// src/Banner.js
import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

const BannerItem = () => {
const navigate = useNavigate();

  return (
    <div className='bannerDivv'>
      <Fragment>
          <div className='banner-top'>
              <div className='banner'>
                  <div className='container'>
                      <div className="row align-items-center">
                          <div className="col-12">
                              <div className="banner-wrapper">
                                  <div className="banner-text">
                                      <h4 className='text-white'>KCCB MOBILE APP</h4>
                                      <h1>WELCOME TO KCCB</h1>
                                  </div>
                                  <div className=''>
                                      <button className='btn btn-info' onClick={() => navigate('/send-delete-request')}>SEND DELETE REQUEST</button>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </Fragment>
    </div>
  );
};

export default BannerItem;
