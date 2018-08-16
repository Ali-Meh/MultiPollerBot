import mongoose from "mongoose";
import {user,answer,Question,Poll} from "./Models";
import DBcfg from "../Config/DBcfg";
import I from "../Util/modelInterfases"


mongoose.connect(DBcfg.geturl(),(err)=>{
    if(err)
        console.log("erroeer: "+JSON.stringify(err,undefined,4));
    else{
        console.log("connected To Database");
        
    }
});

let Dpoll=mongoose.model<I.infPoll>("poll",Poll);
let Danswer=mongoose.model<I.InfAnswers>("Answers",answer);
let Dquestion=mongoose.model<I.infQuestion>("Question",Question);
let Duser=mongoose.model<I.InfUser>("user",user);

export async function addAnswer(answerIn:I.IAnswers){//test
    let answersSoFar=await Danswer.findOne({pollId:answerIn.pollId});
    if(answersSoFar){//poll finded
        if(answersSoFar.users){
            
        }

    }else{//no answer for the poll

    }
    // answersSoFar.save();
    return answersSoFar;
}
export async function AnswersByPollID(pollId:string){
    return await Danswer.findOne({pollId:pollId});
}



export async function addPoll(polle:{ownerId:number,describer:string}){
    let pollee=new Dpoll();
    pollee.ownerId=polle.ownerId;
    pollee.describer=polle.describer;
    pollee.save();
    return pollee;
}

export async function addQuestionToPoll(PollId:string,qustion:{describer:String,Answers:String[]}){
    let poll=await Dpoll.findById(PollId)
    if(poll!=null){
        let Question=new Dquestion();
        Question.pollId=PollId;
        Question.describer=qustion.describer;
        for(let i=0;i<qustion.Answers.length;i++)
        {
            Question.Answers.push(qustion.Answers[i]);
        }
        poll.questions.push(Question);
        poll.save();
        return Question;
    }

}

export async function findUserPolles(UserID:number){
    return Dpoll.find({ownerId:UserID})
}

export async function findPollById(pollId:string){
    return Dpoll.findById(pollId);
}

export function Getdpoll(){
    return Dpoll;
}
export function GetDquestion() {
    return Dquestion;
}
