import {addPoll,addQuestionToPoll} from '../Model/DBHandler';

export class pollMaker{
    static queuedPolls=new Array();

    questionsQueue:question[]

    PollDescriber:string;
    ownerId:number;
    
    public static userPoll(OnwerID:number,PollDescriber:string):pollMaker{
        let poll=pollMaker.queuedPolls.filter((poll:pollMaker)=> poll.ownerId===OnwerID);
        if(poll.length>0){
            return poll[0];
        }else{
            return new pollMaker(PollDescriber,OnwerID);
        }
    }


    TempQuestion?:question;
    /**
     *
     */
    private constructor(pollDes:string,ownID:number) {
        this.PollDescriber=pollDes,
        this.ownerId=ownID
        this.questionsQueue=new Array();
        pollMaker.queuedPolls.push(this);
    }

    public AddQuestion(des:string){
        this.TempQuestion=new question(des);
        this.questionsQueue.push(this.TempQuestion);
    }

    public addAnswers(des:string){
        if(this.TempQuestion)
        {
            this.TempQuestion.addAnswer(des);
        }
    }

    async addToDatabase(){//todo: gotta delet the poll from queue and add it to database
        let poll={
            ownerId:this.ownerId,
            questions:this.questionsQueue,
            describer:this.PollDescriber,
        }

        let polled=await addPoll(poll);

        this.questionsQueue.forEach((Q)=>{
            // addQuestionToPoll(polled._id,Q);
            console.log(JSON.stringify(addQuestionToPoll(polled._id,Q),undefined,4));
        })

        return polled;
        //todo remove from the Queue
    }

}

class question implements Iquestion{
    describer: String;
    Answers: String[];

    /**
     *
     */
    constructor(des:string) {
        this.describer=des;
        this.Answers=new Array();
    }

    public addAnswer(ans:string){
        this.Answers.push(ans);
    }
}

interface Iquestion{
	describer:String,
	Answers:String[]
}