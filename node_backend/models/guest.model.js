const mongoose	= require('mongoose');

const Schema 	= mongoose.Schema;

const guestSchema = new Schema({
	name	:{type:String,	required:true,	trim:true},
	email	:{type:String,	required:true,	trim:true},
	phone	:{type:Number,	required:true},
	checkin	:{type:Date,	default:Date.now},
	checkout:{type:Date},
	host_id:{type: Schema.Types.ObjectId, ref:'Host', required:true},
	hostname:{type:String, required:true,	trim:true}
});

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;

