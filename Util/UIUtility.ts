import * as I from './modelInterfases'
import telegram from 'node-telegram-bot-api';

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

export function MakeInLineMarkUpAnswers(question:I.infQuestion):telegram.InlineKeyboardMarkup{
    let options:Array<telegram.InlineKeyboardButton>=new Array();
    for(let i=0;i<question.Answers.length;i++){
        options.push({text:question.Answers[i].toString(),callback_data:question.pollId+"-"+question._id+"-"+question.Answers[i].toString()});        
    }

    let opts:telegram.InlineKeyboardMarkup = {
        inline_keyboard: [options]
    };


    return opts;
}


export function ShareInlineKeyboard(Id:number){ //todo add the share keyboard

}



//todo add answers key board