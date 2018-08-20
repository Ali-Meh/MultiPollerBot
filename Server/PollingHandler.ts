import telegram, { InlineQueryResultArticle } from 'node-telegram-bot-api';
import { findPollsByOwner ,findPollsById, addAnswer,checkUserState,setUserState,calcAnswers} from '../Util/DBUtil';
import * as UIUtil from '../Util/UIUtility';
import langSelector from '../Util/lang/langSelector';
import I from '../Util/modelInterfases';
import { Question } from '../Model/Models';
const lang=langSelector();


export default class pollingHandler{
    /**
     *
     */
    constructor(bot:telegram) {

        this.InlineQuery(bot);

        this.CallbackQuery(bot);
    }
    InlineQuery(bot:telegram){
        bot.on("inline_query",(args)=>{
            findPollsByOwner(args.from.id).then((polls)=>{
                bot.getMe().then((me:any)=>{                
                    let Querys:Array<telegram.InlineQueryResultArticle>=new Array();
                    if(polls){
    
                        polls.forEach((poll)=>{
                            let query:InlineQueryResultArticle={
                                id:poll.id,
                                type:"article",
                                title:poll.describer.toString(),
                                description:poll.questions[0].describer.toString(),
                                input_message_content:{message_text:lang.Message_Run_Start+poll.describer},
                                reply_markup:{inline_keyboard:[[{text:lang.Inline_Vote,url:"t.me/"+me.username+"?start="+poll._id}]]}//
                            } 
                            Querys.push(query);
                        });
                    }
                    bot.answerInlineQuery(args.id,Querys,{switch_pm_text:lang.Inline_New_Poll,switch_pm_parameter:"new",is_personal:true,cache_time:10});
                }).catch((err)=>{
                    console.error(err);
                })
            });
        })
    }

    CallbackQuery(bot:telegram){
        bot.addListener("callback_query",(args:telegram.CallbackQuery)=>{
            if(args.data){
                let data=args.data.split("-")
                let callbackData:I.CalbackData={pollId:data[0],Qidx:Number(data[1]),ChosenAnswer:data[2]};

                // update the Question
                findPollsById(callbackData.pollId).then((poll)=>{
                    if(poll){
                        checkUserState(poll.id,args.from.id).then((state)=>{
                            if((state===undefined||state.polling===true)&&args.message){
                                addAnswer(callbackData,args.from.id).then(()=>{});
                                try {
                                    bot.editMessageText(UIUtil.GeneratePoll(poll,callbackData.Qidx+1),{chat_id:args.from.id,message_id:args.message.message_id,parse_mode:"HTML"}).then((msg:any)=>{
                                        bot.editMessageReplyMarkup(UIUtil.MakeInLineMarkUpAnswers(poll.questions[callbackData.Qidx+1],callbackData.Qidx+1),{chat_id:args.from.id,message_id:msg.message_id});
                                    });                         
                                } catch (error) { 
                                    setUserState(poll.id,args.from.id,false);
                                    calcAnswers(callbackData.pollId,callbackData.Qidx).then((count)=>{
                                        if(args.message){
                                            bot.sendMessage(args.from.id,lang.notify_PollEnds);
                                            let argss:telegram.CallbackQuery={
                                                id: args.id+"1",
                                                from: args.from,
                                                message: args.message,
                                                chat_instance: args.chat_instance,
                                                data: poll.id+"-"+callbackData.Qidx+"-"+"update",
                                            }
                                            bot.emit("callback_query",argss);
                                            // UIUtil.callbackUIMaker(bot,poll,callbackData,args.from.id,args.message.message_id,count);
                                        }
                                    })
                                }
                            }else{//done the poll and now gotta show the results
                                calcAnswers(callbackData.pollId,callbackData.Qidx).then((count)=>{
                                    if(args.message){
                                        UIUtil.callbackUIMaker(bot,poll,callbackData,args.from.id,args.message.message_id,count);
                                    }
                                })
                            }
                        })

                        //bot.editMessageReplyMarkup(args.from.id,uiUtil.GeneratePoll(poll,0),{parse_mode:"HTML",reply_markup:uiUtil.MakeInLineMarkUpAnswers(poll.questions[0],0)});
                    }else{//fixme Error no Poll finded
                        bot.sendMessage(args.from.id,lang.Error_noPoll_ToStart)
                    }
                })
            }
        })
    };
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