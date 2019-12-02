import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../stylesheets/globalstyles.css";



export default class HostCreate extends Component{
	constructor(props){
		super(props);
		this.onChangeName	= this.onChangeName.bind(this);
		this.onChangePhone	= this.onChangePhone.bind(this);
		this.onChangeEmail	= this.onChangeEmail.bind(this);
		this.onChangeAddress= this.onChangeAddress.bind(this);

		this.onSubmit		= this.onSubmit.bind(this);

		this.state = {
			name:'',
			phone:'',
			email:'',
			address:''
		}
	}

	onChangeName(e){
		this.setState({
			name: e.target.value
		})
	}
	onChangePhone(e){
		this.setState({
			phone: e.target.value
		})
	}
	onChangeEmail(e){
		this.setState({
			email: e.target.value
		})
	}

	onChangeAddress(e){
	this.setState({
		address: e.target.value
	})
	}

	onSubmit(e){
		e.preventDefault();
		const host = {
			name : 		this.state.name,
			phone: 		this.state.phone,
			email: 		this.state.email,
			address: 	this.state.address
		}

		axios.post('http://localhost:5000/host/create',host)
			.then(res => console.log(res.data));

		this.setState({
			name:'',
			phone:'',
			email:'',
			address:''
		})
	}

	render(){
		const styleaddress={width: '100%', height: '150px'}
		return(
			<div>
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
				<div className="container contact-form">
		            <div className="contact-image">
		                <img src="https://image.ibb.co/kUagtU/rocket_contact.png" alt="rocket_contact"/>
		            </div>
					<div className="container contact-form">
			            <form onSubmit={this.onSubmit}>
			                <h3>Enter Host Details</h3>
			               <div className="row">
			                    <div className="col-md-6">
			                        <div className="form-group">
			                            <input type="text" name="Name:" className="form-control" placeholder="Your Name *" value={this.state.name} onChange={this.onChangeName}/>
			                        </div>
			                        <div className="form-group">
			                            <input required type="text" name="Email:" className="form-control" placeholder="Your Email *" value={this.state.email} onChange={this.onChangeEmail}/>
			                        </div>
			                        <div className="form-group">
			                            <input required type="text" name="Phone:" className="form-control" placeholder="Your Phone Number *" value={this.state.phone} onChange={this.onChangePhone}/>
			                        </div>	                        
			                        <div className="form-group">
			                            <input required type="submit" name="btnSubmit" className="btnContact" value="Register" />
			                        </div>
			                    </div>
			                    <div className="col-md-6">
			                        <div className="form-group">
			                            <textarea required type="text" name="Address:" className="form-control" placeholder="Your Address *" style={styleaddress} value={this.state.address} onChange={this.onChangeAddress}></textarea>
			                        </div>
			                    </div>
			                </div>
			            </form>
					</div>
				</div>
			</div>
			)
	}
}