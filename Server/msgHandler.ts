
import telegram from 'node-telegram-bot-api';
import langSelector from '../Util/lang/langSelector';
const lang=langSelector();
import {pollMaker} from '../Util/pollMaker';
import * as dbUtil from '../Util/DBUtil';
import * as uiUtil from '../Util/UIUtility';
import {Track, TrackUtil} from '../Util/UserTracker';

export class botMsgHandler{
    Tbot:telegram;
    /**
     *
     */
    constructor(bot:telegram) {
        this.Tbot=bot;
        this.HandleNewPoll();
    }

    HandleNewPoll(){
        var bot=this.Tbot;
        bot.onText(/^\/new$/,(msg)=>{
            bot.sendMessage(msg.chat.id,lang.new,{reply_markup:{remove_keyboard:true}});
            TrackUtil.setState(msg.chat.id,Track.polldescriber);
            
        })

        bot.onText(/\/extract (.+)/,(msg,match)=>{//todo
            if(match){
                let id;
                let ids=match[1].split("-");
                for(let i=0;i<ids.length;i++){
                    var bool=false; 
                    bool=/^[0-9a-fA-F]{24}$/.test(ids[i].trim())
                    if(bool){
                        id=ids[i].trim();
                        break;
                    }else{//fixme add message
                        // bot.sendMessage(msg.chat.id,"not");
                    }
                }
                bot.sendMessage(msg.chat.id,lang.notify_fileUpload)
                if(id){
                    //todo wire up with search and generating file
                    dbUtil.ExtractAnswers(id,msg.chat.id).then((res)=>{
                        if(res){
                            bot.sendDocument(msg.chat.id,Buffer.from(uiUtil.GenerateCSVFile(res),"utf8"),{caption:"Your File is ready for download"},{  filename: 'Results.csv',contentType: 'text/csv' })
                        }
                        else{
                            bot.sendMessage(msg.chat.id,lang.Error_NOAnswers_sofar);
                        }
                    }).catch((error)=>{
                        bot.sendMessage(msg.chat.id,lang[error.message]);                        
                    })

                }else{//fixme add error
                    bot.sendMessage(msg.chat.id,lang.Error_NoIdSpec);
                }


            }


            // bot.sendMessage(msg.chat.id,lang.Error_NotImplmnt);
        })

        bot.onText(/\/start (.+)/,(msg ,match)=>{
            if(match){ 
                dbUtil.findPollsById(match[1]).then((poll)=>{
                    if(poll){
                        bot.sendMessage(msg.chat.id,lang.notify_loadingPoll).then((loadMsg:any)=>{                        
                            dbUtil.checkUserState(poll.id,msg.chat.id).then((state)=>{
                                if(state===undefined||state.polling===true){//test
                                    bot.editMessageText(poll.describer.toString(),{parse_mode:"HTML",chat_id:loadMsg.chat.id,message_id:loadMsg.message_id}).then((desMsg:any)=>{
                                        //fixme check the index of the question not answered
                                        //@ts-ignore
                                        let Qidx=state===undefined?0:state.answers.length
                                        console.log(JSON.stringify(state,undefined,4));
                                        console.log(JSON.stringify(Qidx,undefined,4));
                                        
                                        

                                        bot.sendMessage(msg.chat.id,uiUtil.GeneratePoll(poll,Qidx),{parse_mode:"HTML",reply_markup:uiUtil.MakeInLineMarkUpAnswers(poll.questions[Qidx],Qidx)});
                                    });
                                }else{//user already answerd the Q's\
                                    bot.editMessageText(lang.notify_haveAnswered,{parse_mode:"HTML",chat_id:loadMsg.chat.id,message_id:loadMsg.message_id})
                                    // bot.sendMessage(msg.chat.id,lang.notify_haveAnswered);
                                    bot.sendMessage(msg.chat.id,lang.notify_loadingPoll).then((message:any)=>{
                                        dbUtil.calcAnswers(poll.id,0).then((count)=>{
                                            uiUtil.callbackUIMaker(bot,poll,{pollId:poll.id,Qidx:0,ChosenAnswer:"view"},msg.chat.id,message.message_id,count);
                                        })
                                    })

                                }
                            })
                        })
                    }else{//fixme Error no Poll finded
                        bot.sendMessage(msg.chat.id,lang.Error_noPoll_ToStart)
                    }
                })
            }
        });





        bot.onText(/^\/start$/, (msg) => {
            bot.sendMessage(msg.chat.id,lang.notify_Run_New_start,{reply_markup:{keyboard:[[{text:"/new"}]],resize_keyboard:true}});
            TrackUtil.setState(msg.chat.id,Track.polling);
            
        });
        bot.onText(/^\/start new$/, (msg) => {
            bot.sendMessage(msg.chat.id,lang.notify_Run_New_start,{reply_markup:{keyboard:[[{text:"/new"}]],resize_keyboard:true}});
            TrackUtil.setState(msg.chat.id,Track.polling);
        });




        bot.on("text",(msg:telegram.Message)=>{
            if(msg.text){
            let poller;
                if(msg.text.indexOf("/mypolls")>-1){//fixme
                    dbUtil.findPollsByOwner(msg.chat.id).then((polls)=>{
                    if(polls){
                        bot.sendMessage(msg.chat.id,lang.notify_myPollsKeyboardUpdate,uiUtil.MakeMarkUp(polls));
                        TrackUtil.setState(msg.chat.id,Track.polling);

                        bot.sendMessage(msg.chat.id, 'Extract:', {
                            reply_markup: {
                                inline_keyboard: [[{
                                    text: 'Share with your friends',
                                    switch_inline_query: 'hello',
                                    // callback_data:"I don't Know"
                                }]]
                            }
                        })

                        return;
                    }
                        bot.sendMessage(msg.chat.id,lang.Error_myPollsNotFound,{reply_markup:{keyboard:[[{text:"/new"}]],resize_keyboard:true}});
                        return;
                    })

                }
                if(msg.text.indexOf("/endQuestion")>-1){
                    poller=pollMaker.userPoll(msg.chat.id,".")
                    if(!TrackUtil.FindState(msg.chat.id)){
                        bot.sendMessage(msg.chat.id,lang.Error_endQuestion_failed);
                        return;
                    }else if(poller){
                        if(poller.TempQuestion&&poller.TempQuestion.Answers.length<2)
                        {
                            bot.sendMessage(msg.chat.id,lang.Error_endQuestion_less2,{reply_markup:{remove_keyboard:true}});
                            return;
                        }
                    }
                    else if(!poller){
                        bot.sendMessage(msg.chat.id,lang.Error_noPollToEnd,{reply_markup:{keyboard:[[{text:"/new"}]],resize_keyboard:true}});
                        return;
                    }
                    bot.sendMessage(msg.chat.id,lang.Track_endQuestion,{reply_markup:{keyboard:[[{text:"/endPoll"}]],resize_keyboard:true}});
                    TrackUtil.setState(msg.chat.id,Track.addQuestion);
                    bot.sendMessage(msg.chat.id,lang.Track_addQuestion);
                    return;
                }
                if(msg.text.indexOf("/endPoll")>-1){//start saving to data base and clening the poll Queue
                    poller=pollMaker.userPoll(msg.chat.id,".")
                    TrackUtil.setState(msg.chat.id,Track.polling);
                    if(poller){
                        if((poller.PollDescriber===".")||!TrackUtil.FindState(msg.chat.id)){
                            bot.sendMessage(msg.chat.id,lang.Error_noPollToEnd,{reply_markup:{keyboard:[[{text:"/new"}]],resize_keyboard:true}});

                            // bot.sendMessage(msg.chat.id,lang.JSON.stringify(v,undefined,4));
                            return;
                        }
                        bot.sendMessage(msg.chat.id,lang.notify_addedTodatabase,{reply_markup:{keyboard:[[{text:"/mypolls"}]],resize_keyboard:true}});//fixme no option yet runs the get answer track
                        poller.addToDatabase();
                        return;
                    }else{
                        bot.sendMessage(msg.chat.id,lang.Error_noPollToEnd,{reply_markup:{keyboard:[[{text:"/new"}]],resize_keyboard:true}});
                        return;
                    }
                }
    
                let user=TrackUtil.FindState(msg.chat.id);
                
                if(user){

                    if(user.trace!==Track.polling)
                        poller=pollMaker.userPoll(msg.chat.id,msg.text);

                    if(poller){
                        switch (user.trace) {
                            case Track.polling:
                                break;
                            case Track.polldescriber:
                                TrackUtil.setState(msg.chat.id,Track.addQuestion)
                                // bot.emit("text",msg);
                                bot.sendMessage(msg.chat.id,lang.Track_addQuestion)
                                break;
                            case Track.addQuestion:
                                bot.sendMessage(msg.chat.id,lang.Track_addAnswer,{reply_markup:{keyboard:[[{text:"/endQuestion"}]],resize_keyboard:true}})
                                poller.AddQuestion(msg.text);
                                TrackUtil.setState(msg.chat.id,Track.addAnswer);
                                break;
                            case Track.addAnswer:
                                bot.sendMessage(msg.chat.id,lang.Track_addAnswer,{reply_markup:{keyboard:[[{text:"/endQuestion"}]],resize_keyboard:true}})                           
                                poller.addAnswers(msg.text);
                                // bot.sendMessage(msg.chat.id,lang.Track_addAnswer);
                                // TrackUtil.setState(msg.chat.id,Track.addAnswer);
                                break;
                            default:
                                bot.sendMessage(msg.chat.id,lang.Track_defualt);
                                break;
                        }
                    }
                }
                
            }
        })
    }
}

