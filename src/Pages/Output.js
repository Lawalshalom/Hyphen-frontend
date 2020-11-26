import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router';

const Output = (props) => {

  const [ redirect, setRedirect ] = useState(null);

  const appUserPreference = props.userPreference;
  const sessionUserPreference = JSON.parse(sessionStorage.getItem("userPreference"));

  const userPreference = appUserPreference || sessionUserPreference;

  const { date, theme, comment } = userPreference;

  useEffect(() => {
    return document.body.classList.add(theme);
  })

  const displayDate = (date) => {
    const dateParts = date.split("-");
    const [ year, month, day ] = dateParts;
    const myDate = new Date();
    myDate.setFullYear(year, month -1, day);
    return myDate.toDateString();
  }

  const handleModify = () => {
    return setRedirect({
        pathname: "/",
        state: {userPreference, message: "Modify your preferences"}
      });
  };

  const handleCancel = () => {
    const confirm = window.confirm("Are you sure you want to unsuscribe?");
    if (confirm){
      props.setUserPreference(null);
      return setRedirect({
          pathname: "/",
          state: {message: "You have unsubscribed successfully"}
        });
    }
  };

  if (redirect !== null){
    return <Redirect to={redirect}/>
   }
   else return (
    <div className="container output">
      <div className="text-center">
        <img src="https://res.cloudinary.com/lawfirm1000/image/upload/v1606300600/chaeban_pmo1jm.jpg"
            alt="chaeban logo"/>
      </div>
      <div>
        <a href="/"><i className="fa fa-arrow-left mr-2" aria-hidden="true">
              </i>Go to Input</a>
      </div>
      <div className="d-flex flex-column align-items-center">
        <div className="details">
          <p className="col-md-8">Your chosen delivery date is: <strong>{displayDate(date)}</strong></p>
          <p className="col-md-8">Your additional comment is: <strong>{comment}</strong></p>
        </div>
        <div className="d-flex flex-column justify-content-between col-md-7">
          <button className="btn btn-warning" onClick={handleModify}>Modify Subscription</button>
          <button className="btn btn-danger" onClick={handleCancel}>Cancel Subscription</button>
        </div>

        <div className="d-flex col-md-7 mt-4">
          <a href="https://github.com/lawalshalom/chaeban-ice-cream" className="btn btn-primary github-btn">
            <i className="fa fa-github mr-2" aria-hidden="true"></i>Github Repo</a>
        </div>
      </div>
    </div>
  )
}
export default Output;