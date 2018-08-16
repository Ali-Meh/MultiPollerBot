import * as DBHandler from '../Model/DBHandler';
import I from'./modelInterfases';
import { answer } from '../Model/Models';

interface IuserAnswer{questionID:String,answerId:Number}

export async function calcAnswers(pollId:string,questionID:string){
    let Answers=await DBHandler.AnswersByPollID(pollId);
    if(Answers){
        let questions:Array<IuserAnswer>=new Array();
        for(let i=0;i<Answers.users.length;i++){
            let userAnswer=Answers.users[i].answers.filter((answer)=>{answer.questionID===questionID});
            questions.push(userAnswer[0]);
        }
        
    }else{
        //set all to 0 
    }
}




export async function checkUserState(pollId:string,userid:number){
    return setUserState(pollId,userid);
}
export async function setUserState(pollId:string,userid:number,state?:boolean){
    let user=await DBHandler.FindPollingUser(pollId,userid.toString(),state);
    if(user&&user.length>0){
        return user[0].polling;
    }
    return undefined;//todo hash the id
}
export async function addAnswer(data:I.CalbackData,userid:number){
    let poll=await findPollsById(data.pollId);
    if(poll){
        let Q=poll.questions[data.Qidx];
        let answer:I.IAnswers={
            pollId:data.pollId,
            user:{
                userIdHash:userid.toString(),//todo Hash the id
                answers:[{questionID:Q.id,answerId:(Number(data.ChosenAnswer)+1)}]
            }
        }
        DBHandler.addAnswer(answer);
    }else{//fixme no poll finded

    }
    return poll;
}

export async function findPollsByOwner(userID:number){
    let dbPolls:I.infPoll[]=await DBHandler.findUserPolles(userID);
    if(dbPolls.length>0){
        return dbPolls;
    }
    return undefined;
}
export async function findPollsById(pollId:string){
    let dbPolls:I.infPoll|null=await DBHandler.findPollById(pollId);
    if(dbPolls){
        return dbPolls;
    }
    return undefined;
}

export function IToDBI(input:I.IPoll) {
    let Dpoll=DBHandler.Getdpoll();
    let output = new Dpoll();
    output.ownerId=input.ownerId;
    output.describer=input.PollDescriber;
    input.questionsQueue.forEach((Q)=>{
        let dbquestions=DBHandler.GetDquestion();
        let temp=new dbquestions();
        temp.describer=Q.describer;
        Q.Answers.forEach((A)=>{
            temp.Answers.push(A);
        })  
        output.questions.push(temp);
    })
    return output;
}

export function langFinder(){//todo
    DBHandler
}

export function langSetter(){//todo
    
}