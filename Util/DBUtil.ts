import * as DBHandler from '../Model/DBHandler';
import I from'./modelInterfases';

export async function addAnswer(data:I.CalbackData,userid:number){//test 
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