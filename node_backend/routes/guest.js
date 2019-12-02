const router	=require('express').Router();
let Guest		=require('../models/guest.model');
let Host 		=require('../models/host.model');
let {PythonShell} = require('python-shell');


router.route('/').get((req,res)=>{
	Guest.find()
	.then(guests => res.json(guests))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/enter').post((req,res) => {
	const newGuest = new Guest({
		name		: req.body.name,
		phone		: req.body.phone,
		email		: req.body.email,
		host_id		: req.body.host_id,
		hostname	: req.body.hostname});

	newGuest.save(function(err,ng){
		if(err){
			console.log(err);
		}else{
			Host.findByIdAndUpdate(req.body.host_id,{
			$push : {guests : ng._id}
	}).then().catch((error)=>{console.log(error)});
		}
	});
	Host.findOne({_id : newGuest.host_id}).then(host=>{
		const phone   = host.phone.toString();
		const email = host.email.toString();
		const message = "Visitor Details:-\nName:"+newGuest.name+"\nPhone:"+newGuest.phone+ "\nEMail:" +newGuest.email;
		var options = {
		  mode: 'text',
		  pythonPath: '/usr/bin/python3',
		  pythonOptions: ['-u'],
		  scriptPath: __dirname.toString(),
		  args: [phone,message,email]
		};
		PythonShell.run('send.py',options,function(err,results){
			if(err) throw err;
			console.log('results: %j',results);
		});

	}).catch(err =>{res.status(500).json(err)});
});

router.route('/exit/:id').get((req,res) => {
	Guest.findByIdAndUpdate(req.params.id,{
		checkout: Date.now()
	},{new:true}).then((result) => {
		console.log('Clocked Out')

		Host.findOne({_id: result.host_id}).then(host =>{
			const message="Name: "+result.name+"\nPhone: "+result.phone+"\nCheckIn: "+result.checkin+"\nCheckOut: "+result.checkout+"\nHost Name: "+result.hostname+"\nAddress: "+host.address;
			const phone   = result.phone.toString();
			const email = result.email.toString();	
			var options = {
			  mode: 'text',
			  pythonPath: '/usr/bin/python3',
			  pythonOptions: ['-u'],
			  scriptPath: __dirname.toString(),
			  args: [phone,message,email]
			};
			PythonShell.run('send.py',options,function(err,results){
				if(err) throw err;
				console.log('results: %j',results);
			});	
		}).catch(err=>console.log(err));

	})
});


router.route('/findguest').post((req,res)=>{
	var search_term = req.body.name;
	Guest.find({name: {$regex :search_term},
				checkout: {$exists : false}}).limit(16)
		.then(guests		=> res.json(guests))
		.catch(err 		=> res.status(500).json('Error: '+err));
});

module.exports = router;