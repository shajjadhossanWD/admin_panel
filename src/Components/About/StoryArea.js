import React from 'react';

const StoryArea = ({ paddingClass = "" }) => {
    return (
        <section className={"story-area" + paddingClass}>
            <div className="container">
                <div className="story-title">
                    <h2>We handle All Service Activities with Customers in Mind</h2>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="story-image">
                            <a
                                href="https://www.youtube.com/watch?v=BVMsRltq2yU"
                                className="video-btn popup-youtube"
                            >
                                <i className="flaticon-play-button"></i>
                            </a>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="story-content">
                            <h3>Our Story</h3>
                            <b>
                                Will be updated soon!
                            </b>
                            <p>
                                Will be updated soon!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StoryArea;