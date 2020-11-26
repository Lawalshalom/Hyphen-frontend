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

  //formatting the date to display
  const displayDate = (date) => {
    const dateParts = date.split("-");
    const [ year, month, day ] = dateParts;
    const myDate = new Date();
    myDate.setFullYear(year, month -1, day);
    const dayOfMonth = Number.parseInt(day);
    const dayArray = [...dayOfMonth.toString()];
    let dayString;
    switch (dayArray[dayArray.length-1]) {
      case "1":
        dayString = dayOfMonth + "st";
        break;
      case "2":
        dayString = dayOfMonth + "nd";
        break;
      case "3":
        dayString = dayOfMonth + "rd";
        break;
      default: dayString = dayOfMonth + "th"
        break;
    }
    return {
      date: myDate.toDateString(),
      dayString
    }
  }

  //modify subscription
  const handleModify = () => {
    return setRedirect({
        pathname: "/",
        state: {userPreference, message: "Modify your preferences"}
      });
  };

  //cancel subscription
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
      <div className="text-center" data-aos="fade-down">
        <img src="https://res.cloudinary.com/lawfirm1000/image/upload/v1606300600/chaeban_pmo1jm.jpg"
            alt="chaeban logo"/>
      </div>
      <div data-aos="fade-left">
        <a href="/"><i className="fa fa-arrow-left mr-2" aria-hidden="true">
              </i>Go to Input</a>
      </div>
      <div className="d-flex flex-column align-items-center" data-aos="fade-up" data-aos-delay="200">
        <div className="details">
          <p className="">Your chosen delivery date is: <strong>{displayDate(date).date}</strong></p>
          <p className="">You will get your deliveries every <strong>{displayDate(date).dayString}</strong> of every month</p>
          <p className="">Your additional comment is: <strong>{comment}</strong></p>
        </div>
        <div className="d-flex flex-column" data-aos="fade-up" data-aos-delay="400">
          <button className="btn btn-warning" onClick={handleModify}>Modify Subscription</button>
          <button className="btn btn-danger" onClick={handleCancel}>Cancel Subscription</button>
        </div>

        <div className="d-flex mt-4" data-aos="fade" data-aos-delay="600">
          <a href="https://github.com/lawalshalom/chaeban-ice-cream" target="_blank" rel="noopener noreferrer" className="btn btn-primary github-btn">
            <i className="fa fa-github mr-2" aria-hidden="true"></i>Github Repo</a>
        </div>
      </div>
    </div>
  )
}
export default Output;