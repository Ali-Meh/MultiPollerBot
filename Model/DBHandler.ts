import mongoose from "mongoose";
import {User,Question,Poll} from "./Models";
import DBcfg from "../Config/DBcfg";
import * as dbinf from "../Util/modelInterfases"


mongoose.connect(DBcfg.geturl(),(err)=>{
    if(err)
        console.log("erroeer: "+JSON.stringify(err,undefined,4));
    else{
        console.log("connected To Database");
        
    }
});

let Dpoll=mongoose.model<dbinf.infPoll>("poll",Poll);
let Duser=mongoose.model("UserAnswered",User);
let Dquestion=mongoose.model<dbinf.infQuestion>("Question",Question);

export async function addPoll(polle:{ownerId:number,describer:string}){
    let pollee=new Dpoll();
    pollee.ownerId=polle.ownerId;
    pollee.describer=polle.describer;
    pollee.save();
    return pollee;
}

export function addQuestionToPoll(PollId:string,qustion:{describer:String,Answers:String[]}){
    let Question=new Dquestion();
    Question.pollId=PollId;
    Question.describer=qustion.describer;
    for(let i=0;i<qustion.Answers.length;i++)
    {
        Question.Answers.push(qustion.Answers[i]);
    }
    Question.save();
    return Question;
}

