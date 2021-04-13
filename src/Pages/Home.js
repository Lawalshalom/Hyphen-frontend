import React from 'react';
import logo from '../images/logo.png';

const Home = () => {

const countDownDate = new Date("Jun 1, 2021 00:00:00").getTime();
    const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("demo").innerHTML = days + "d " + hours + "h "
    + minutes + "m " + seconds + "s ";

    if (distance < 0) {
      clearInterval(x);
      document.getElementById("demo").innerHTML = "EXPIRED";
    }
}, 1000);

    return (
        <div className="bgimg">
        <div className="container">
        <div className="topleft">
          <img src={logo} alt="" />
        </div>
        <div className="middle">
          <h1>COMING SOON</h1>
          <hr/>
          <div id="demo"></div>
        </div>
        <div className="bottomleft">
          <p>Hyphen &copy; 2021</p>
        </div>
        </div>
      </div>
    )
}

export default Home;
