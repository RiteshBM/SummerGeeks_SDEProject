import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router,Route} from "react-router-dom";
import { Link } from 'react-router-dom';
import './App.css';

import GuestEnter from    "./components/guest/guest_enter.js";
import GuestExit from   "./components/guest/guest_exit.js";
import HostCreate from    "./components/host/host_create.js";
import HostStatus from    "./components/host/host_status.js";
import HomePage1 from "./components/menus/homepage1.js";
import HomePage2 from "./components/menus/homepage2.js";
import HomePage3 from "./components/menus/homepage3.js";



class App extends Component {
	render() {
		return (
		<div className="maindiv">
			<Router>
				<Route path="/guest/enter" exact component={GuestEnter}/>
				<Route path="/guest/exit" exact component={GuestExit}/>
				<Route path="/host/create" exact component={HostCreate}/>
				<Route path="/host/status" exact component={HostStatus}/>
				<Route path="/" 			exact component={HomePage1}/>
				<Route path="/host" 		exact component={HomePage2}/>
				<Route path="/guest" 		exact component={HomePage3}/>

				
			</Router>
		</div>
		);
	}
}

export default App;
