import React from 'react';

const ContactArea = () => {
    return (
        <section className="contact-area ptb-50">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 col-md-12">
                        <div className="contact-form">
                            <div className="tile">
                                <h3>Leave Us a Message</h3>
                                <p>
                                    Your email address will not be published. Required fields are
                                    marked *
                                </p>
                            </div>

                            <form id="contactForm">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Your Name*</label>

                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="form-control"
                                                required
                                                data-error="Please enter your name"
                                            />
                                            <div className="help-block with-errors"></div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Email address*</label>

                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="form-control"
                                                required
                                                data-error="Please enter your email"
                                            />
                                            <div className="help-block with-errors"></div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-12">
                                        <div className="form-group">
                                            <label>Phone*</label>

                                            <input
                                                type="text"
                                                name="phone_number"
                                                id="phone_number"
                                                className="form-control"
                                                required
                                                data-error="Please enter your phone number"
                                            />
                                            <div className="help-block with-errors"></div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-12">
                                        <div className="form-group">
                                            <label>Subject*</label>

                                            <input
                                                type="text"
                                                name="subjects"
                                                id="subjects"
                                                className="form-control"
                                                required
                                                data-error="Please enter your subjects"
                                            />
                                            <div className="help-block with-errors"></div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>Message*</label>

                                            <textarea
                                                name="message"
                                                id="message"
                                                cols="30"
                                                rows="5"
                                                required
                                                data-error="Please enter your message"
                                                className="form-control"
                                            ></textarea>
                                            <div className="help-block with-errors"></div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 col-md-12">
                                        <button type="submit" className="default-btn">
                                            Send Message
                                            <span></span>
                                        </button>
                                        <div id="msgSubmit" className="h3 text-center hidden"></div>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="col-lg-5 col-md-12">
                        <div className="contact-information">
                            <h3>Visit us</h3>

                            <ul className="contact-list">
                                <li>
                                    <i className="bx bx-map"></i> Address:{" "}
                                    <span>22 Sin Ming Lane #06-76 Midview City Singapore 573969</span>
                                </li>
                                <li>
                                    <i className="bx bx-phone-call"></i> Phone:{" "}
                                    <a href="tel:+15143214567">+6 0149939183</a>
                                </li>
                                <li>
                                    <i className="bx bx-envelope"></i> Email:{" "}
                                    <a href="mailto:hello@econix.com">support@dslcommerce.com</a>
                                </li>
                            </ul>

                            <h4>Hours of operation:</h4>
                            <ul className="opening-hours">
                                <li>
                                    Monday: <span>08:00am-10:00pm</span>
                                </li>
                                <li>
                                    Tuesday: <span>08:00am-10:00pm</span>
                                </li>
                                <li>
                                    Wednesday: <span>08:00am-10:00pm</span>
                                </li>
                                <li>
                                    Thursday: <span>08:00am-10:00pm</span>
                                </li>
                                <li>
                                    Friday: <span>08:00am-10:00pm</span>
                                </li>
                                <li>
                                    Saturday: <span>08:00am-10:00pm</span>
                                </li>
                                <li>
                                    Sunday: <span>Closed</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactArea;