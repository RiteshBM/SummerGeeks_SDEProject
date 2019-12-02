import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../stylesheets/globalstyles.css";


const Host = props => (
	<div className='card'>
		<div className="card-body">
			<table className="table table-hover">
				<tbody>
					<tr>
						<td>Name</td>
						<td>{props.host.name}</td>
					</tr>
					<tr>
						<td>Address</td>
						<td>{props.host.address}</td>
					</tr>
					<tr>
						<td>Phone</td>
						<td>{props.host.phone}</td>
					</tr>
					<tr>
						<td>Email</td>
						<td>{props.host.email}</td>
					</tr>
				</tbody>
			</table>
			<a href="#" className='btn btn-primary' onClick={() => { props.hostSelected(props.host._id,props.host.name)}}>Select</a>
		</div>
	</div>
	)


export default class GuestEnter extends Component{
	constructor(props){
		super(props);

		this.onChangeName		= this.onChangeName.bind(this);
		this.onChangePhone		= this.onChangePhone.bind(this);
		this.onChangeEmail		= this.onChangeEmail.bind(this);
		this.onChangeHostName	= this.onChangeHostName.bind(this);
		this.onSubmit			= this.onSubmit.bind(this);
		this.hostSelected		= this.hostSelected.bind(this);

		this.state = {
			name:'',
			phone:'',
			email:'',
			hostname:'',
			hostid:'',
			hostchosen:false,
			hostlist:[]
		}
		
	}

	hostSelected(hid,hname){
		this.setState({hostname:hname,
						hostid:hid,
						hostchosen:true});
	}

	hostList(){
		return this.state.hostlist.map(currentHost => {
			return <Host host={currentHost} hostSelected={this.hostSelected} key={currentHost._id}/>
		});
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
	onChangeHostName(e){
		this.setState({
			hostname: e.target.value,
			hostchosen:false
		},()=>{
		axios.post('http://localhost:5000/host/findhost',{"name":this.state.hostname})
				.then(hosts => {
					this.setState({hostlist:hosts.data});
					});
				});
	}

	onSubmit(e){
		e.preventDefault();
		const guest = {
			name   : this.state.name,
			phone  : this.state.phone,
			email  : this.state.email,
			host_id: this.state.hostid,
			hostname:this.state.hostname
		}
		console.log(guest)
		axios.post('http://localhost:5000/guest/enter',guest)
			.then();

		this.setState({
			name:'',
			phone:'',
			email:'',
			hostname:'',
			hostid:'',
			hostlist:[]
		});
	}

	render(){
		let button;
		let options;
		if(this.state.hostchosen)
		{
			button = <div className="form-group"><button name="btnSubmit" type="submit" className="btnContact" >Enter</button></div>;
			options=null;
		}
		else
		{
			button = <div className="form-group"><button disabled name="btnSubmit" type="button" className="btnContact" >Select Host From List</button></div>;
			options=<div className="container">
						<div className="card-columns">
							{this.hostList()}
						</div>
					</div>	
		}
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
						<h3> Enter Guest Details </h3>
						<div className="row">
							<div className="col-md-6">
								<div className="form-group">
									<input type="text" required className="form-control" value={this.state.name} onChange={this.onChangeName} placeholder="Your Name"/>
								</div>
								<div className="form-group">
									<input type="text" required className="form-control" value={this.state.phone} onChange={this.onChangePhone}  placeholder="Your Phone Numebr"/>
								</div>
								{button}
							</div>
							<div className="col-md-6">
								<div className="form-group">
									<input type="text" required className="form-control" value={this.state.email} onChange={this.onChangeEmail}  placeholder="Your Email"/>
								</div>
								<div className="form-group">
									<input type="text" required className="form-control" value={this.state.hostname} onChange={this.onChangeHostName}  placeholder="Your Host's Name"/>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
			{options}
		</div>
			)
	}
}