
import telegram from 'node-telegram-bot-api';
const lang=require('../Util/lang/en.json');
import * as polling from '../Util/pollMaker'
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
            TrackUtil.setState(msg.chat.id,Track.addQuestion);
        })

        bot.on("text",(msg:telegram.Message)=>{
            if(msg.text&&msg.text.indexOf("/endQuestion")>-1){
                bot.sendMessage(msg.chat.id,lang.Track_endQuestion);
                TrackUtil.setState(msg.chat.id,Track.addQuestion)
            }

            let user=TrackUtil.FindState(msg.chat.id);
            if(user){
                switch (user.trace) {
                    case Track.addQuestion:
                        bot.sendMessage(msg.chat.id,lang.Track_addQuestion);
                        TrackUtil.setState(msg.chat.id,Track.addAnswer);
                        break;
                    case Track.addAnswer:
                        bot.sendMessage(msg.chat.id,lang.Track_addAnswer);
                        // TrackUtil.setState(msg.chat.id,Track.addAnswer);
                        break;
                    default:
                        bot.sendMessage(msg.chat.id,lang.Track_defualt);
                        break;
                }
            }
            
        })
    }
}

