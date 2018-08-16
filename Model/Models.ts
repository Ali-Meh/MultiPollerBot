var Schema = require('mongoose').Schema;



export let user=new Schema({
	userIdHash:String,
	answers:[{questionID:String,answerId:Number}]
})

export let answer=new Schema({
	pollId:String,
	users:[user]
});

export let Question=new Schema({
	pollId:String,
	describer:String,
	Answers:[String]//id of the  room the answer is in will be saved
})

export let Poll=new Schema({
	ownerId:Number,
	questions:[Question],
	describer:String
	
})