import * as I from './modelInterfases'

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

// export function ShareInlineKeyboard(Id:number){ {//todo add the share keyboard
    // bot.sendMessage(msg.chat.id, 'Share:', {
    //     reply_markup: {
    //         inline_keyboard: [[{
    //             text: 'Share with your friends',
    //             switch_inline_query: 'share'
    //         }]]
    //     }
    // })
// }



//todo add answers key board