const mongoose	= require('mongoose');

const Schema 	= mongoose.Schema;

const hostSchema = new Schema({
	name	:{type:String,	required:true,	trim:true},
	email	:{type:String,	required:true,	trim:true},
	address	:{type:String,	required:true,	trim:true},
	phone	:{type:Number,	required:true},
	guests 	:[{type: Schema.Types.ObjectId}]
	
});

const Host = mongoose.model('Host', hostSchema);

module.exports = Host;

