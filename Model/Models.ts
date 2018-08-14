var Schema = require('mongoose').Schema;



export let User=new Schema({
	userId:Number,
	pollId:String,
	answers:[{questionID:Number,answerId:Number}]
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