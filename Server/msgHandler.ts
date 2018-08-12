
import telegram from 'node-telegram-bot-api';
const lang=require('../Util/lang/en.json');
import {pollMaker} from '../Util/pollMaker'
import {UserTrack,Track, TrackUtil} from '../Util/UserTracker'
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


                if(msg.text.indexOf("/endQuestion")>-1){
                    bot.sendMessage(msg.chat.id,lang.Track_endQuestion);
                    TrackUtil.setState(msg.chat.id,Track.addQuestion);
                    bot.sendMessage(msg.chat.id,lang.Track_addQuestion);
                    return;
                }
                if(msg.text.indexOf("/endPoll")>-1){//start saving to data base and clening the poll Queue
                    poller=pollMaker.userPoll(msg.chat.id,"dsf")
                    bot.sendMessage(msg.chat.id,JSON.stringify(poller,undefined,4));
                }
    
                let user=TrackUtil.FindState(msg.chat.id);
                if(user){
                    switch (user.trace) {
                        case Track.polldescriber:
                            poller=pollMaker.userPoll(msg.chat.id,msg.text);
                            TrackUtil.setState(msg.chat.id,Track.addQuestion)
                            // bot.emit("text",msg);
                            bot.sendMessage(msg.chat.id,lang.Track_addQuestion)
                            break;
                        case Track.addQuestion:
                            bot.sendMessage(msg.chat.id,lang.Track_addAnswer)
                            poller=pollMaker.userPoll(msg.chat.id,msg.text);
                            poller.AddQuestion(msg.text);
                            TrackUtil.setState(msg.chat.id,Track.addAnswer);
                            break;
                        case Track.addAnswer:
                            bot.sendMessage(msg.chat.id,lang.Track_addAnswer)
                            poller=pollMaker.userPoll(msg.chat.id,msg.text);
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
        })
    }
}

