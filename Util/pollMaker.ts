
interface infPoll{
    ownerId:number,
	questions:infQuestion[],
	describer:String
}

interface infQuestion{
	pollId:String,
	describer:String,
	Answers:String[]
}

export class pollMaker{
    ownerId:number;
    questions:infQuestion[]=new Array();
    describer:String;
    static pollesQueue:pollMaker[];
    pollID?:string;
    /**
     *
     */
    constructor(ownerID:number,describer:string) {
        this.ownerId=ownerID;
        this.describer=describer;
        // this.questions.push();
        pollMaker.pollesQueue.push(this);
    }

    addQuestion(question:infQuestion){
        this.questions.push(question);
    }

    // qustionGenerator():infQuestion{
    //     question.
    // }
}

class question implements infQuestion{
    pollId: String;
    describer: String;
    Answers: String[];

    /**
     *
     */
    constructor(pollId:string,des:string) {
        this.describer=des;
        this.pollId=pollId;
        this.Answers=new Array();
    }

    addAnswer(answer:string){
        this.Answers.push(answer);
    }
}