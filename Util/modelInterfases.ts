import mongoose from 'mongoose';



export interface infPoll extends mongoose.Document{
    ownerId:number,
	questions:[infQuestion],
	describer:String
}

export interface infQuestion extends mongoose.Document{
	pollId:String,
	describer:String,
	Answers:[String]
}