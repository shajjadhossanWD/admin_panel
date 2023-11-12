import React from 'react';

const VisionArea = ({ paddingClass = "" }) => {
    return (
        <section className={"vision-area" + paddingClass}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="vision-image"></div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="vision-content">
                            <h3>Our Vision</h3>
                            <b>
                                Will be updated soon!
                            </b>

                            <ul className="vision-list">
                                <li>
                                    <i className="flaticon-check"></i>
                                    Will be updated soon!
                                </li>
                                <li>
                                    <i className="flaticon-check"></i>
                                    Sed do eiusmod tempor incididunt ut labore et dolore magna
                                    aliqua.
                                </li>
                                <li>
                                    <i className="flaticon-check"></i>
                                    Quis ipsum suspendisse ultrices gravida.
                                </li>
                                <li>
                                    <i className="flaticon-check"></i>
                                    Risus commodo viverra maecenas accumsan lacus vel facilisis.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VisionArea;