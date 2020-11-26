import React, { useEffect, useState } from "react";
import { Route, Switch } from 'react-router-dom';
import Input from "./Pages/Input";
import Output from "./Pages/Output";
import Error from "./Error";
import './Components/App.css';
import AOS from 'aos';

const App = () => {
  const [ userPreference, setUserPreference ] = useState(null);

  useEffect(() => {
    AOS.init({
      disable: false,
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,

      offset: 20,
      delay: 0,
      duration: 1000,
      easing: 'ease-in',
      once: true,
      mirror: false,
      anchorPlacement: 'top-bottom',
    });
  });

  return (
    <main>
        <Switch>
            <Route path="/" render={renderprops =>
              <Input setUserPreference={setUserPreference} {...renderprops} />} exact />
            <Route path="/output" render={renderprops =>
              <Output userPreference={userPreference} setUserPreference={setUserPreference} {...renderprops} />} />
            <Route render={renderprops =>
              <Error {...renderprops} />} />
        </Switch>
    </main>
    );
};
export default App;