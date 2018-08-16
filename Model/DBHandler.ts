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


export async function FindPollingUser(pollid:string,userHashId:string,setUserState?:boolean){

    let answer=await AnswersByPollID(pollid);
    // console.log(JSON.stringify(answer,undefined,4));
    
    if(answer){
        let user=answer.users.filter((U)=>U.userIdHash===userHashId);
        if(user){//user polls
            if(setUserState!==undefined){//change users state in polling whether done or not
                user[0].polling=setUserState;
                answer.save();
            }
            return user;
        }
        else{
            return undefined;
        }
    }else{
        return undefined;
    }
    
}



export async function addAnswer(answerIn:I.IAnswers){//test
    let answersSoFar=await AnswersByPollID(answerIn.pollId.toString());
    // console.log(JSON.stringify(answersSoFar,undefined,4));
    
    if(answersSoFar){//poll finded
        let user=answersSoFar.users.filter((U)=>U.userIdHash===answerIn.user.userIdHash);
        if(user.length>0){//user Existes
            answerIn.user.answers.forEach((A)=>{
                user[0].answers.push(A)
            })
        }else{//user not Found
            user[0]=new Duser(answerIn.user);
            // console.log(JSON.stringify(user[0],undefined,4));
            answersSoFar.users.push(user[0]);
        }
    }else{//no answer for the poll
        user[0]=new Duser(answerIn.user);
        user[0].polling=true;
        answersSoFar=new Danswer();
        answersSoFar.pollId=answerIn.pollId;
        answersSoFar.users.push(user[0]);
    }
    answersSoFar.save();
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
    let polls=await Dpoll.find({ownerId:UserID});
    // console.log(JSON.stringify(UserID,undefined,4));
    // console.log(JSON.stringify(polls,undefined,4));
    
    return polls;
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

