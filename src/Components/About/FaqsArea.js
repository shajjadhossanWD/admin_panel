import React, { useState } from "react";
import axios from "axios";
import { Data } from "./Data";
import { DataShopping } from "./DataShopping";
import { DataReturns } from "./DataReturns";
import { DataPayment } from "./DataPayment";
import toast from "react-hot-toast";
import swal from "sweetalert";

function FaqsArea() {
    const [clicked, setClicked] = useState(false);
    const [toggleState, setToggleState] = useState(1);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phnNumber, setPhnNumber] = useState("");
    const [subject, setSubject] = useState("");
    const [messages, setMessages] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // alert('submitted');

        // console.log(name, email, phnNumber, subject, messages);

        await axios.post('https://backend.dslcommerce.com/api/faq/save-full-data', { name, email, phnNumber, subject, messages })
            .then(res => {
                if (res.status === 200) {
                    // alert(res.data.message);
                    swal({
                        // title: "Success",
                        text: `${res.data.message}`,
                        icon: "success",
                        button: "OK!",
                        className: "modal_class_success",
                    });
                    setName("");
                    setEmail("");
                    setPhnNumber("");
                    setSubject("");
                    setMessages("");
                }
            })
            .catch(error => {
                // console.log(error.message);
                toast.error(`Something went wrong `, { id: "errorSend" });

            })




        // e.target.reset();


    };

    const toggle = (index) => {
        if (clicked === index) {
            return setClicked(null);
        }
        setClicked(index);
    };

    const toggleTab = (index) => {
        setToggleState(index);
    };

    return (
        <section className="faqs-area ptb-50">
            <div className="container">
                <div className="section-title">
                    <h2>Frequently Asked Questions</h2>
                </div>

                <div className="tab faqs-list-tab">
                    <ul className="tabs">
                        <li
                            className={toggleState === 1 ? "current" : ""}
                            onClick={() => toggleTab(1)}
                        >
                            <a href="#" onClick={(event) => event.preventDefault()}>
                                Shopping basics
                            </a>
                        </li>

                        <li
                            className={toggleState === 2 ? "current" : ""}
                            onClick={() => toggleTab(2)}
                        >
                            <a href="#" onClick={(event) => event.preventDefault()}>
                                Payments
                            </a>
                        </li>

                        <li
                            className={toggleState === 3 ? "current" : ""}
                            onClick={() => toggleTab(3)}
                        >
                            <a href="#" onClick={(event) => event.preventDefault()}>
                                Returns
                            </a>
                        </li>
                    </ul>

                    <div className="tab_content">
                        {DataShopping.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={
                                        toggleState === 1 ? "show at-item" : "accordion-display"
                                    }
                                >
                                    <div className="faq-accordion">
                                        <ul className="accordion">
                                            <li className="accordion-item">
                                                <div onClick={() => toggle(index)}>
                                                    <span className="accordion-title">
                                                        {item.question}
                                                        <span>
                                                            {clicked === index ? (
                                                                <i className="bx bx-minus minus-icon"></i>
                                                            ) : (
                                                                <i className="bx bx-plus"></i>
                                                            )}
                                                        </span>
                                                    </span>
                                                </div>
                                                {clicked === index ? (
                                                    <p className="accordion-content show">
                                                        {item.answer}
                                                    </p>
                                                ) : null}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}

                        {DataPayment.map((item, index) => {
                            return (
                                <div
                                    className={
                                        toggleState === 2 ? "show at-item" : "accordion-display"
                                    }
                                    key={index}
                                >
                                    <div className="faq-accordion">
                                        <ul className="accordion">
                                            <li className="accordion-item">
                                                <div onClick={() => toggle(index)}>
                                                    <span className="accordion-title">
                                                        {item.question}
                                                        <span>
                                                            {clicked === index ? (
                                                                <i className="bx bx-minus minus-icon"></i>
                                                            ) : (
                                                                <i className="bx bx-plus"></i>
                                                            )}
                                                        </span>
                                                    </span>
                                                </div>
                                                {clicked === index ? (
                                                    <p className="accordion-content show">
                                                        {item.answer}
                                                    </p>
                                                ) : null}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}

                        {DataReturns.map((item, index) => {
                            return (
                                <div
                                    className={
                                        toggleState === 3 ? "show at-item" : "accordion-display"
                                    }
                                    key={index}
                                >
                                    <div className="faq-accordion">
                                        <ul className="accordion">
                                            <li className="accordion-item">
                                                <div onClick={() => toggle(index)}>
                                                    <span className="accordion-title">
                                                        {item.question}
                                                        <span>
                                                            {clicked === index ? (
                                                                <i className="bx bx-minus minus-icon"></i>
                                                            ) : (
                                                                <i className="bx bx-plus"></i>
                                                            )}
                                                        </span>
                                                    </span>
                                                </div>
                                                {clicked === index ? (
                                                    <p className="accordion-content show">
                                                        {item.answer}
                                                    </p>
                                                ) : null}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="faq-contact-form">
                    <form id="contactForm" className="form" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="form-control"
                                        required
                                        data-error="Please enter your name"
                                        placeholder="Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <div className="help-block with-errors"></div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="form-control"
                                        required
                                        data-error="Please enter your email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <div className="help-block with-errors"></div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="phone_number"
                                        id="phone_number"
                                        required
                                        data-error="Please enter your number"
                                        className="form-control"
                                        placeholder="Phone"
                                        value={phnNumber}
                                        onChange={(e) => setPhnNumber(e.target.value)}
                                    />
                                    <div className="help-block with-errors"></div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="msg_subject"
                                        id="msg_subject"
                                        className="form-control"
                                        required
                                        data-error="Please enter your subject"
                                        placeholder="Subject"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                    />
                                    <div className="help-block with-errors"></div>
                                </div>
                            </div>

                            <div className="col-lg-12 col-md-12">
                                <div className="form-group">
                                    <textarea
                                        name="message"
                                        className="form-control"
                                        id="message"
                                        cols="30"
                                        rows="6"
                                        required
                                        data-error="Write your message"
                                        placeholder="Your Message"
                                        value={messages}
                                        onChange={(e) => setMessages(e.target.value)}
                                    ></textarea>
                                    <div className="help-block with-errors"></div>
                                </div>
                            </div>

                            <div className="col-lg-12 col-md-12">
                                <div className="send-btn">
                                    <button
                                        type="submit"
                                        className="default-btn"
                                        style={{ cursor: "pointer" }}
                                    >
                                        Send Message
                                        <span></span>
                                    </button>
                                </div>
                                <div id="msgSubmit" className="h3 text-center hidden"></div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default FaqsArea;
