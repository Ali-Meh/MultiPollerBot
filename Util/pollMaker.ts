import {addPoll,addQuestionToPoll} from '../Model/DBHandler';

export class pollMaker{
    static queuedPolls=new Array();

    questionsQueue:question[]

    PollDescriber:string;
    ownerId:number;
    
    public static userPoll(OnwerID:number,PollDescriber:string):pollMaker|undefined{
        let poll=pollMaker.queuedPolls.filter((poll:pollMaker)=> poll.ownerId===OnwerID);
        if(poll.length>0){
            return poll[0];
        }else if(PollDescriber!=="."){
            return new pollMaker(PollDescriber,OnwerID);
        }else{
            return undefined;
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

    async addToDatabase(){
        let poll={
            ownerId:this.ownerId,
            questions:this.questionsQueue,
            describer:this.PollDescriber,
        }

        let polled=await addPoll(poll);

        for(let i=0;i<this.questionsQueue.length;i++){
            await addQuestionToPoll(polled._id,this.questionsQueue[i]);
        }


        pollMaker.queuedPolls=pollMaker.queuedPolls.filter((poll)=>poll!==this);
        return polled;
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