import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../stylesheets/globalstyles.css";

const Guest = props => (
					<tr><td>{props.guest.name}</td>
					<td>{props.guest.hostname}</td>
					<td>{props.guest.phone}</td>
					<td>{props.guest.email}</td>
					<td>{props.guest.checkin}</td>
					<td><a href="#" onClick={() => { props.removeGuest(props.guest._id) }}>Clock Out!</a></td></tr>
	)


export default class GuestExit extends Component{
	constructor(props){
		super(props);

		this.onChangeGuestName	= this.onChangeGuestName.bind(this);
		this.removeGuest		= this.removeGuest.bind(this);
		this.state = {
			guestname : '',
			guestchosen:false,
			guestlist :[],
		};
	}

	onChangeGuestName(e){
		this.setState({
			guestname: e.target.value,
			guestchosen:false
		},()=>{
		axios.post('http://localhost:5000/guest/findguest',{"name":this.state.guestname})
				.then(guests => {
					this.setState({guestlist:guests.data});
					});
				});
	}

	removeGuest(gid){
		axios.get('http://localhost:5000/guest/exit/'+gid).then(response =>{
		}).catch((error) => {console.log(error)}); 
		this.setState({guestname:""})
	}

	guestList(){
		return this.state.guestlist.map(currentGuest => {
			return<Guest guest={currentGuest} removeGuest={this.removeGuest} key={currentGuest._id}/>
		})
	}

	render(){
		if(this.state.guestname.length!=0)
		{
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
							<h3> Enter Guest Name </h3>
							<div className="row">
								<div className="col-md-12 text-center">
									<div className="form-group">
										<input type="text" required className="form-control" value={this.state.guestname} onChange={this.onChangeGuestName}  placeholder="Your Host's Name"/>
									</div>
								</div>
							</div>
						</form>
					</div>
					<div className='presentguestlist'>
				        <h3>Guests by the name of {this.state.guestname}</h3>
				        <table className="table presentguesttable">
				          <thead className="thead-light">
				            <tr>
				              <th>Name</th>
				              <th>Host Name</th>
				              <th>Phone</th>
				              <th>Email</th>
				              <th>CheckIn Time</th>
				              <th>Clock Out</th>
				            </tr>
				          </thead>
				          <tbody>
				            { this.guestList() }
				          </tbody>
				        </table>
	     			</div>
				</div>
			</div>
			)
		}
		else
		{
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
							<h3> Enter Guest Name </h3>
							<div className="row">
								<div className="col-md-12 text-center">
									<div className="form-group">
										<input type="text" required className="form-control" value={this.state.guestname} onChange={this.onChangeGuestName}  placeholder="Your Host's Name"/>
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
}