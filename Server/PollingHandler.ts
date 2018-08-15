import telegram from 'node-telegram-bot-api';
import { findPollsByOwner } from '../Util/DBUtil';
import * as UIUtil from '../Util/UIUtility';


export default class pollingHandler{
    /**
     *
     */
    constructor(bot:telegram) {

        this.CallbackQuery(bot);
        this.InlineQuery(bot);
    }


    CallbackQuery(bot:telegram){
        bot.addListener("callback_query",(args)=>{
            console.log(JSON.stringify(args,undefined,4));
            bot.editMessageText("no more",{message_id:args.message.message_id,chat_id:args.from.id}).then((val)=>{
                console.log(JSON.stringify(val,undefined,4));
                
            });

        })
    }


    InlineQuery(bot:telegram){
        bot.addListener("inline_query",(args)=>{
            console.log(JSON.stringify(args,undefined,4));
        })
    }



    


}



// bot.addListener("callback_query",(atgs)=>{
//     console.log(JSON.stringify(atgs,undefined,4));
//     bot.editMessageText("no more",{message_id:atgs.message.message_id,chat_id:atgs.from.id}).then((val)=>{
//         console.log(JSON.stringify(val,undefined,4));
        
//     });
// });
// bot.addListener("inline_query",(atgs:telegram.InlineQuery)=>{
//     findPollsByOwner(atgs.from.id).then((val)=>{
//         console.log("inline");
        
//     console.log(JSON.stringify(atgs,undefined,4));
//     // console.log(JSON.stringify(val,undefined,4));


//         // let v:telegram.InlineQueryResult={
//         //     type:
//         // }
//         // bot.answerInlineQuery(atgs.id,)
//     })
// });