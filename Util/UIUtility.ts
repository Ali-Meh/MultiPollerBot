import * as I from './modelInterfases'
import telegram from 'node-telegram-bot-api';
import { Question } from '../Model/Models';

export function MakeMarkUp(arrayOFOptions:I.infPoll[],replyToMsgId?:number){
    let options:String[]=new Array();
    for(let i=0;i<arrayOFOptions.length;i++){
        options.push("/share "+(i+1).toString()+" - "+arrayOFOptions[i].describer+" -  with " + arrayOFOptions[i].questions.length+" questions");
    }
    let opts:any = {
        reply_markup: JSON.stringify({
            keyboard: [options],
            resize_keyboard: true,
        })
    };
    if(replyToMsgId){
        opts.reply_to_message_id=replyToMsgId
    }
    return opts;
}

export function MakeInLineMarkUpAnswers(question:I.infQuestion,Qidx:number):telegram.InlineKeyboardMarkup{
    let options:Array<telegram.InlineKeyboardButton>=new Array();
    for(let i=0;i<question.Answers.length;i++){
        options.push({text:(i+1).toString(),callback_data:question.pollId+"-"+Qidx+"-"+i});        
    }

    let opts:telegram.InlineKeyboardMarkup = {
        inline_keyboard: [options]
    };


    return opts;
}

export function GeneratePoll(poll:I.infPoll,QIdx:number):string{
    if(QIdx>=poll.questions.length){
        throw new Error("question Query is More than Questions Count");
    }
    /**question <bold>
     * 
     * (number) answer
     * 
     */
    let Message:string;
    let Q=poll.questions[QIdx];
    Message="<b>"+Q.describer+"</b>\n\n\n\n";
    for(let i=0;i<Q.Answers.length;i++){
        Message+="<code>("+(i+1)+")</code> - "+Q.Answers[i]+"\n\n";
    }
    return Message;
}




export function GenPollResualts(poll:I.infPoll){}//todo for showing the reasults so far for the poll

export function ShareInlineKeyboard(Id:number){ //todo add the share keyboard

}



//todo add answers key board