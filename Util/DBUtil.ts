import * as DBHandler from '../Model/DBHandler';
import * as I from'./modelInterfases';



// export async function findPollsByOwner(userID:number){
//     let dbPolls:I.infPoll[]=await DBHandler.findUserPolles(userID);
//     let dbquestions:
//     let Polls:I.IPoll[];

//     dbPolls.forEach((dbpoll)=>{
//         Polls.push({PollDescriber:dbpoll.describer,ownerId:dbpoll.ownerId});
//     })
// }

export function DBIToI(input:I.infPoll){
    let Output=new I.Cpoll(input.describer,input.ownerId);
        // Output.questionsQueue=input.
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