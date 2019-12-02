import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../../stylesheets/homepagestyles.css";
export default class HomePage2 extends Component {

    render()
    {
        return(
          <div className="mainpage">
                <ul>
                    <li>
                        <Link to="/host" className="nav-link">
                                Host
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="nav-link">
                                Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/guest" className="nav-link">
                                Guest
                        </Link>
                    </li>
                </ul>
            <div className="headerdiv">
              <h1>Visitor Management System</h1>
            </div>
            <div className="mainpage">    
                <Link to="/host/create">
                    <button type="button" className="hostbutton btn btn-1">
                        <h2>Register as a Host</h2>
                    </button>
                </Link>
                <Link to="/host/status">
                    <button type="button" className="guestbutton btn btn-1">
                        <h2>Host Status</h2>
                    </button>
                </Link>
            </div>
            </div>
        )
    }
}

