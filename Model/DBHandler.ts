import mongoose from "mongoose";
import {User,Question,Poll} from "./Models";
import DBcfg from "../Config/DBcfg";
import * as dbinf from "../Util/modelInterfases"
import * as Exeption from "../Util/Exeptions"


mongoose.connect(DBcfg.geturl(),(err)=>{
    if(err)
        console.log("erroeer: "+JSON.stringify(err,undefined,4));
    else{
        console.log("connected To Database");
        
    }
});

let Dpoll=mongoose.model<dbinf.infPoll>("poll",Poll);
let Duser=mongoose.model("UserAnswered",User);
let Dquestion=mongoose.model("Question",Question);

export async function addPoll(polle:dbinf.infPoll){
    let pollee=await Dpoll.findOne({ownerId:polle.ownerId,describer:polle.describer});
    if(!pollee){
        pollee=new Dpoll(polle);
        pollee.save();
    }
    return pollee;
}

export async function addQuestionToPoll(PollId:string,qustion:dbinf.infQuestion){
    // Dpoll.findById(PollId).then((polle)=>{
    //     if(polle&&polle.questions){
    //         polle.questions.push(qustion);
    //     }
    // })

    let polle=await Dpoll.findById(PollId);
    if(polle){
        polle.questions.push(qustion);
    }else{
        throw new Exeption.noPollFinded("no poll finded to apend new qustion");
    }
}

