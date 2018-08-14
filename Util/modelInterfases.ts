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
export class Cpoll implements IPoll{
	questionsQueue: Iquestion[]=new Array();
	PollDescriber: String;
	ownerId: number;

	/**
	 *
	 */
	constructor(PollDescriber: String,ownerId: number) {
		this.PollDescriber=PollDescriber;
		this.ownerId=ownerId;
	}
}
interface Iquestion{
	describer:String,
	Answers:String[]
}

export interface IPoll{
	questionsQueue:Iquestion[]
    PollDescriber:String;
    ownerId:number;
}