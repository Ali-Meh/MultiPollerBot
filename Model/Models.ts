var Schema = require('mongoose').Schema;



let User=new Schema({
	userId:Number,
	pollId:String,
	answers:[{questionID:Number,answerId:Number}]
});


let Question=new Schema({
	pollId:String,
	describer:String,
	Answers:[String]//id of the  room the answer is in will be saved
})

let Poll=new Schema({
	ownerId:Number,
	questions:[Question],
})