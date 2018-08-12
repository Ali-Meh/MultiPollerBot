
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
            TrackUtil.setState(msg.chat.id,Track.addQuestion)
        })

        bot.on("text",(msg:telegram.Message)=>{
        
            if(msg.text&&msg.text.indexOf("/endQuestion")>-1){
                bot.sendMessage(msg.chat.id,"okey a question added go ahead and end poll setup with /endPoll otherwize go ahead and add more questions");
                TrackUtil.setState(msg.chat.id,Track.addQuestion)
            }

            let user=TrackUtil.FindState(msg.chat.id);
            if(user){
                switch (user.trace) {
                    case Track.addQuestion:
                        bot.sendMessage(msg.chat.id,"please provide the question");
                        TrackUtil.setState(msg.chat.id,Track.addAnswer);
                        break;
                    case Track.addAnswer:
                        bot.sendMessage(msg.chat.id,"please add your distractors on evrey post use /endQuestion to end question");
                        TrackUtil.setState(msg.chat.id,Track.addAnswer);
                        break;
                    default:
                        bot.sendMessage(msg.chat.id,"sorry but you havenot needed a poll use /new to generate a poll together!!!");
                        break;
                }
            }
            
        })
    }
}

