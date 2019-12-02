import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "../../stylesheets/globalstyles.css";

const Host = props => (
<div className='col-sm-12 col-lg-4'>
	<div className='card h-100'>
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
			<a href="#" className='btn btn-primary cardbuttonselect' onClick={() => { props.hostSelected(props.host._id,props.host.name)}}>Select</a>
		</div>
	</div>
</div>
	)


const Guest = props => (
		<tr>
			<td>{props.guest.name}</td>
			<td>{props.guest.phone}</td>
			<td>{props.guest.email}</td>
			<td>{props.guest.checkin}</td>
			<td>
				<a href="#" onClick={() => { props.removeGuest(props.guest._id) }}>Clock Out!</a>
			</td>
		</tr>
	)

const PastGuest = props => (
		<tr>
			<td>{props.guest.name}</td>
			<td>{props.guest.phone}</td>
			<td>{props.guest.email}</td>
			<td>{props.guest.checkin}</td>
			<td>{props.guest.checkout}</td>
		</tr>
	)

export default class HostStatus extends Component{
	constructor(props){
		super(props);

		this.onChangeHostName	= this.onChangeHostName.bind(this);
		this.hostSelected		= this.hostSelected.bind(this);
		this.removeGuest		= this.removeGuest.bind(this);
		this.state = {
			hostname : '',
			hostid  :'',
			hostchosen:false,
			hostlist :[],
			guestlist :[],
			pastguestlist :[]
		};
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

	hostSelected(hid,hname){
		this.setState({hostname:hname,
						hostchosen:true,
						hostid:hid},()=>{
				axios.get('http://localhost:5000/host/presentguests/'+this.state.hostid).then(response=>{
					this.setState({guestlist:response.data})
				}).catch((error) => {
					console.log(error);});
				axios.get('http://localhost:5000/host/pastguests/'+this.state.hostid).then(response=>{
					this.setState({pastguestlist:response.data})
				}).catch((error) => {
					console.log(error);
				});
			}
		);
	}

	removeGuest(gid){
		axios.get('http://localhost:5000/guest/exit/'+gid).then(response =>{
		}).catch((error) => {console.log(error)});
		axios.get('http://localhost:5000/host/presentguests/'+this.state.hostid).then(response=>{
			this.setState({guestlist:response.data})
			axios.get('http://localhost:5000/host/pastguests/'+this.state.hostid).then(response=>{
					this.setState({pastguestlist:response.data})
				}).catch((error) => {
					console.log(error);
				});
		}).catch((error) => {
			console.log(error);
		})
	}

	guestList(){
		return this.state.guestlist.map(currentGuest => {
			return<Guest guest={currentGuest} removeGuest={this.removeGuest} key={currentGuest._id}/>
		})
	}
	pastguestList(){
		return this.state.pastguestlist.map(currentGuest => {
			return<PastGuest guest={currentGuest} key={currentGuest._id}/>
		})
	}
	hostList(){
		return this.state.hostlist.map(currentHost => {
			return <Host host={currentHost} hostSelected={this.hostSelected} key={currentHost._id}/>
		});
	}

	render(){
		let past,current;
		if(this.state.pastguestlist.length>0)
		{
		   past=<div className='pastguestlist'>
			        <h3>Past Visitors of {this.state.hostname}</h3>
			        <table className="table presentguesttable">
			          <thead className="thead-light">
			            <tr>
			              <th>Name</th>
			              <th>Phone Number</th>
			              <th>Email</th>
			              <th>CheckIn Time</th>
			              <th>CheckOut Time</th>
			            </tr>
			          </thead>
			          <tbody>
			            { this.pastguestList() }
			          </tbody>
			        </table>
     			</div>
		}
		else
		{
			past=<div className='pastguestlist'>
			        <h3>No Past Visitors of {this.state.hostname}</h3>
     			</div>
		}
		if(this.state.guestlist.length>0)
		{
			current=<div className='presentguestlist'>
				        <h3>Current Visitors of {this.state.hostname}</h3>
				        <table className="table presentguesttable">
				          <thead className="thead-light">
				            <tr>
				              <th>Name</th>
				              <th>Phone Number</th>
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
		}
		else
		{
			current=<div className='presentguestlist'>
				        <h3>No Current Visitors of {this.state.hostname}</h3>
				    </div>
		}
		if(this.state.hostchosen)
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
							<h3> Enter Host Name </h3>
							<div className="row">
								<div className="col-md-12 text-center">
									<div className="form-group">
										<input type="text" required className="form-control" value={this.state.hostname} onChange={this.onChangeHostName}  placeholder="Your Host's Name"/>
									</div>
								</div>
							</div>
						</form>
					</div>
					{current}
	     			{past}
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
							<h3> Enter Host Name </h3>
							<div className="row">
								<div className="col-md-12 text-center">
									<div className="form-group">
										<input type="text" required className="form-control" value={this.state.hostname} onChange={this.onChangeHostName}  placeholder="Your Host's Name"/>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div className="container-fluid content-row">
					<div className="row">
						{this.hostList()}
					</div>
				</div>
			</div>
				)	
		}
		
	}	
}