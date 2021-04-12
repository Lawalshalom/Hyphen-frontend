import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Pages/Home";
import Error from "./Error";
import "./Components/App.scss";

const App = () => {
	return (
		<main>
			<Switch>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route render={(renderprops) => <Error {...renderprops} />} />
			</Switch>
		</main>
	);
};
export default App;
