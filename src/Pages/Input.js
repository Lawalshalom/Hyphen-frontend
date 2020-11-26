import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';

const Input = (props) => {
    const [ redirect, setRedirect ] = useState(null);

    useEffect(() => {
        document.body.classList.remove("dark", "green", "blue");
        return document.body.classList.add("light");
      })


      //modifying previous preferences
    let savedPreference, message;
    if (typeof props.location.state === "object"){
        savedPreference = props.location.state.userPreference;
        message = props.location.state.message;
    }
    let defaultDate, defaultTheme, defaultComment;

    if (typeof savedPreference === "object"){
        defaultDate = savedPreference.date;
        defaultTheme = savedPreference.theme;
        defaultComment = savedPreference.comment;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = document.getElementById("input-form");
        const formData = new FormData(form);
        const date = formData.get("delivery date");
        const theme = formData.get("theme");
        const comment = formData.get("comments");

        const userPreference = {
            date,
            theme,
            comment
        };
        props.setUserPreference(userPreference);
        sessionStorage.setItem("userPreference", JSON.stringify(userPreference))
        return setRedirect("/output");
    }

    if (redirect !== null){
     return <Redirect to={redirect}/>
    }
    else return (
        <div className="container input">
            <div className="text-center">
                <img src="https://res.cloudinary.com/lawfirm1000/image/upload/v1606300600/chaeban_pmo1jm.jpg"
                    alt="chaeban logo"/>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center mt-4">
                <h2 className="text-center pl-4 pr-4"><strong>Ice Cream Subscription Service</strong></h2>
                <p className="text-center mt-2">Kindly fill in your preferences for your monthly homemade ice cream subscription!</p>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center">
                {
                    message &&
                    <div className="alert col-md-12 col-md-10 col-lg-8 alert-dismissible fade show" role="alert">
                        <p className="text-danger">{message}</p>
                        <button type="button" id="closeTerms"  className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true" className="text-danger">&times;</span>
                        </button>
                    </div>
                }

            <form id="input-form" className="col-12 col-lg-10" onSubmit={handleSubmit}>
                <div className="d-flex flex-column flex-md-row input-detail">
                    <div className="col-12 col-md-6">
                        <p><strong>Which date would you like to have  your deliveries?</strong></p>
                        <p>Please choose a date for your gluten-free ice cream deliveries.</p>
                    </div>
                    <div className="ml-md-5">
                        <div className="d-flex align-items-center justify-content-md-center ml-3">
                            <input type="date" id="deliveryDate" defaultValue={defaultDate} name="delivery date" placeholder="dd/mm/yyyy" required/>
                        </div>
                    </div>
                </div>

                <div className="d-flex flex-column flex-md-row input-detail">
                    <div className="col-12 col-md-6">
                        <p><strong>Choose your favourite theme?</strong></p>
                        <p>Kindly pick your favourite theme outlook to display your preferences.</p>
                    </div>
                    <div className="ml-3 ml-md-5">
                        <div className="d-flex ml-md-3 align-items-center">
                            <input type="radio" id="dark-theme" name="theme" defaultChecked={defaultTheme === "dark"} value="dark" required/>
                            <label className="pl-2 pt-2" htmlFor="dark-theme">Dark theme</label>
                        </div>
                        <div className="d-flex ml-md-3 align-items-center">
                            <input type="radio" id="light-theme" name="theme" defaultChecked={defaultTheme === "light"} value="light" required/>
                            <label className="pl-2 pt-2" htmlFor="light-theme">Light theme</label>
                        </div>
                        <div className="d-flex ml-md-3 align-items-center">
                            <input type="radio" id="blue-theme" name="theme" defaultChecked={defaultTheme === "blue"} value="blue" required/>
                            <label className="pl-2 pt-2" htmlFor="blue-theme">Blue theme</label>
                        </div>
                        <div className="d-flex ml-md-3 align-items-center">
                            <input type="radio" id="green-theme" name="theme" defaultChecked={defaultTheme === "green"} value="green" required/>
                            <label className="pl-2 pt-2" htmlFor="green-theme">Green theme</label>
                        </div>

                    </div>
                </div>

                <div className="d-flex flex-column flex-md-row input-detail">
                    <div className="col-12 col-md-6">
                        <p><strong>Additional comments or Special request?</strong></p>
                        <p>We want to know more about your subscription, in about 50 words (there's a 400 character limit).</p>
                    </div>
                    <div className="d-flex justify-content-center ml-md-5">
                        <textarea placeholder="Write here" minLength="5" maxLength="400" defaultValue={defaultComment} name="comments" spellCheck="true" required></textarea>
                    </div>
                </div>
                <div className="d-flex flex-column flex-md-row input-detail">
                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center justify-content-md-start">
                        <p className="text-center text-md-left"><strong>Hit submit once you're done</strong></p>
                    </div>
                    <div className="col-12 col-md-6 d-flex justify-content-center">
                        <button className="btn completed" id="submit-btn" type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    );
};
export default Input;