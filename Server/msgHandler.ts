
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
        bot.onText(/^\/new$/,(msg)=>{// here we get the desciber for the poll
            bot.sendMessage(msg.chat.id,lang.new);
            TrackUtil.setState(msg.chat.id,Track.polldescriber);
            
        })

        bot.on("text",(msg:telegram.Message)=>{
            if(msg.text){
            let poller;
                if(msg.text.indexOf("/myPolls")>-1){
                    dbUtil.findPollsByOwner(msg.chat.id).then((polls)=>{
                        if(polls){
                            bot.sendMessage(msg.chat.id,lang.notify_myPollsKeyboardUpdate,uiUtil.MakeMarkUp(polls));

    bot.sendMessage(msg.chat.id, 'Share:', {
        reply_markup: {
            inline_keyboard: [[{
                text: 'Share with your friends',
                switch_inline_query: 'hello',
                callback_data:"I don't Know"
            }]]
        }
    })

                            return;
                        }
                        bot.sendMessage(msg.chat.id,lang.Error_myPollsNotFound);
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
                            bot.sendMessage(msg.chat.id,lang.Error_endQuestion_less2);
                            return;
                        }
                    }
                    else if(!poller){
                        bot.sendMessage(msg.chat.id,lang.Error_noPollToEnd);
                        return;
                    }
                    bot.sendMessage(msg.chat.id,lang.Track_endQuestion);
                    TrackUtil.setState(msg.chat.id,Track.addQuestion);
                    bot.sendMessage(msg.chat.id,lang.Track_addQuestion);
                    return;
                }
                if(msg.text.indexOf("/endPoll")>-1){//start saving to data base and clening the poll Queue
                    poller=pollMaker.userPoll(msg.chat.id,".")
                    if(poller){
                        if((poller.PollDescriber===".")||!TrackUtil.FindState(msg.chat.id)){
                            bot.sendMessage(msg.chat.id,lang.Error_noPollToEnd);
                            // bot.sendMessage(msg.chat.id,lang.JSON.stringify(v,undefined,4));
                            return;
                        }
                        bot.sendMessage(msg.chat.id,lang.notify_addedTodatabase);//fixme no option yet runs the get answer track
                        poller.addToDatabase();
                        return;
                    }else{
                        bot.sendMessage(msg.chat.id,lang.Error_noPollToEnd);
                        return;
                    }
                }
    
                let user=TrackUtil.FindState(msg.chat.id);
                if(user){
                    poller=pollMaker.userPoll(msg.chat.id,msg.text);

                    if(poller){
                        switch (user.trace) {
                            case Track.polldescriber:
                                TrackUtil.setState(msg.chat.id,Track.addQuestion)
                                // bot.emit("text",msg);
                                bot.sendMessage(msg.chat.id,lang.Track_addQuestion)
                                break;
                            case Track.addQuestion:
                                bot.sendMessage(msg.chat.id,lang.Track_addAnswer)
                                poller.AddQuestion(msg.text);
                                TrackUtil.setState(msg.chat.id,Track.addAnswer);
                                break;
                            case Track.addAnswer:
                                bot.sendMessage(msg.chat.id,lang.Track_addAnswer)                           
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

