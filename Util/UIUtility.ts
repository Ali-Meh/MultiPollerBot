import I from './modelInterfases'
import telegram from 'node-telegram-bot-api';



//if Qidx<1 no prev
//if Qidx>=length-1 of Q's no next
//a botuom to update corrent
export function MakeInLineMarkUpResultes(poll:I.infPoll,QIdx:number,/* answers */){//


    let Message:string;
    let Q=poll.questions[QIdx];
    Message="<b>"+Q.describer+"</b>\n\n\n\n";
    for(let i=0;i<Q.Answers.length;i++){
        Message+="<code>("+(i+1)+")</code> - "+Q.Answers[i]+"\n\n";
    }
}


export function callbackUIMaker(bot:telegram,poll:I.infPoll,callbackData:I.CalbackData,count:{[key:string]:number},userId:number,messageId:number){
    bot.editMessageText(GeneratePoll(poll,callbackData.Qidx,count),{chat_id:userId,message_id:messageId,parse_mode:"HTML"}).then((msg:any)=>{
        bot.editMessageReplyMarkup({inline_keyboard:[[{text:"next!",callback_data:(callbackData.Qidx-1).toString()},
        {text:"pre!",callback_data:(callbackData.Qidx-1).toString()}]]},{chat_id:userId,message_id:msg.message_id});
    })
}




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

export function GeneratePoll(poll:I.infPoll,QIdx:number,count?:{[k: string]: number}):string{
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
        Message+="<code>("+(i+1)+")</code> - "+Q.Answers[i]+"\n";
        if(count){
            if(count[(i+1).toString()]){
                Message+=" - "+count[(i+1).toString()]+"\n";
                let percentege=count[(i+1).toString()]/count["total"]
                for(let i=0;i<percentege*10;i++)
                    Message+="👍";
                Message+=percentege*100+"%\n\n"
            }else{
                Message+="\n";
                Message+="ℹ️";
                Message+=0+"%\n\n"
            }
        }else{
            Message+="\n\n"
        }
    }
    if(count){
        Message+=count["total"]+"👤 people particpated so far!!!";
    }

    return Message;
}




export function GenPollResualts(poll:I.infPoll){}//todo for showing the reasults so far for the poll

export function ShareInlineKeyboard(Id:number){ //todo add the share keyboard

}



//todo add answers key board