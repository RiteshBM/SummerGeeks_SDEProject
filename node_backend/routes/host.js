const router	=require('express').Router();
let Host		=require('../models/host.model');
let Guest		=require('../models/guest.model');

router.route('/').get((req,res)=>{
	Host.find()
	.then(hosts => res.json(hosts))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/create').post((req,res) => {
	console.log('Recieved new host request');
	const newHost = new Host({
		name		: req.body.name,
		phone	: req.body.phone,
		address	: req.body.address,
		email		: req.body.email});

	newHost.save()
		.then(() => res.json('New Host Created !'))
		.catch(err=> res.status(400).json('Error: '+err));
});

router.route('/presentguests/:id').get((req,res)=>{
	guestlist=[]
	allguest ={present:[],past:[]}
	Host.findById(req.params.id,function(err,user){
		guestlist=user.guests;
		Guest.find({'_id': {$in: guestlist},'checkout':{$exists: false}},function(err,docs){
			res.json(docs);
		});
	});
	
});

router.route('/pastguests/:id').get((req,res)=>{
	guestlist=[]
	allguest ={present:[],past:[]}
	Host.findById(req.params.id,function(err,user){
		guestlist=user.guests;
		Guest.find({'_id': {$in: guestlist},'checkout':{$exists: true}},function(err,docs){
			res.json(docs);
		});
	});
	
});

router.route('/findhost').post((req,res)=>{
	var search_term = req.body.name;
	Host.find({name: {"$regex" : search_term}}).limit(16)
		.then(hosts		=> res.json(hosts))
		.catch(err 		=> res.status(500).json('Error: '+err));

});

module.exports = router;