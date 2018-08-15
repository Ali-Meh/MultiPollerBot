import telegram, { InlineQueryResultArticle } from 'node-telegram-bot-api';
import { findPollsByOwner } from '../Util/DBUtil';
import * as UIUtil from '../Util/UIUtility';
import langSelector from '../Util/lang/langSelector';
const lang=langSelector();


export default class pollingHandler{
    /**
     *
     */
    constructor(bot:telegram) {

        this.CallbackQuery(bot);
        this.InlineQuery(bot);
    }


    CallbackQuery(bot:telegram){
        bot.addListener("callback_query",(args:telegram.CallbackQuery)=>{
            console.log(JSON.stringify(args,undefined,4));
            if(args.message){
                bot.editMessageText("no more",{message_id:args.message.message_id,chat_id:args.from.id}).then((val)=>{
                    console.log(JSON.stringify(val,undefined,4));
                });
            }
            // bot.answerCallbackQuery(args.id,{text:"hello",url:"http://t.me/unkownchatbot?Pollid=1234&vote=3"})
        })
    }


    InlineQuery(bot:telegram){

        bot.addListener("inline_query",(args:telegram.InlineQuery)=>{

            let Querys:Array<telegram.InlineQueryResultArticle>=new Array();


            
            findPollsByOwner(args.from.id).then((polls)=>{
                bot.getMe().then((me:any)=>{
                    console.log(me.username);
                    
                    if(polls){
                        polls.forEach((poll)=>{
                            let query:InlineQueryResultArticle={
                                id:poll._id,
                                type:"article",
                                title:poll.describer.toString(),
                                description:poll.questions[0].describer.toString(),
                                input_message_content:{message_text:lang.Message_Run_Start+poll.describer},
                                reply_markup:{inline_keyboard:[[{text:"string",url:"http://t.me/"+me.username+"?start="+poll._id}]]}
                            }
    
    
    
                            Querys.push(query);
                        });
                        bot.answerInlineQuery(args.id,Querys,{switch_pm_text:"NEW Poll",switch_pm_parameter:"new"});
                    }else{//fixme error Handler for no
    
                    }
                }).catch((err)=>{
                    console.error(err);
                })

            });



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