import mongoose from 'mongoose';

declare namespace I{


	interface Iuser{
		userIdHash:String,
		answers:[{questionID:String,answerId:Number}]
	}
	interface InfAnswers extends mongoose.Document{
		pollId:String,
		users:[InfUser]
	}
	interface InfUser extends mongoose.Document{
		userIdHash:String,
		answers:[{questionID:String,answerId:Number}]
	}
	interface IAnswers{
		pollId:String,
		user:Iuser
	}
	interface infPoll extends mongoose.Document{
		ownerId:number,
		questions:[infQuestion],
		describer:String
	}

	interface infQuestion extends mongoose.Document{
		pollId:String,
		describer:String,
		Answers:[String]
	}


	interface Iquestion{
		describer:String,
		Answers:String[]
	}


	interface IPoll{
		questionsQueue:Iquestion[]
		PollDescriber:String;
		ownerId:number;
	}

	interface CalbackData{
		pollId:string,
		Qidx:number,
		ChosenAnswer:string
	}


	
}


export default I;