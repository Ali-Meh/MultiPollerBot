
import telegram from 'node-telegram-bot-api';
const lang=require('../Util/lang/en.json');
import * as polling from '../Util/pollMaker'
import {UserTrack,Track, TrackUtil} from '../Util/UserTracker'
export class botMsgHandler{
    Tbot:telegram;
    static userTrack:UserTrack[];
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
            bot.sendMessage(msg.chat.id,lang.new);
            console.log("new poll wanted");
            TrackUtil.setState(msg.chat.id,Track.addQuestion,botMsgHandler.userTrack)
        })

        bot.on("text",(msg:telegram.Message)=>{

            console.log(JSON.stringify(botMsgHandler.userTrack,undefined,4));
            
            if(msg.text&&msg.text.indexOf("/endQuestion")>-1){
                bot.sendMessage(msg.chat.id,"okey a question added go ahead and done poll with /endPoll otherwize go ahead and add more questions");
                let t=TrackUtil.setState(msg.chat.id,Track.addQuestion,botMsgHandler.userTrack)
                console.log(JSON.stringify(t,undefined,4));
            }


            // switch (TrackUtil.FindState(msg.chat.id,botMsgHandler.userTrack)) {
            //     case Track.polldescriber:
            //         bot.sendMessage(msg.chat.id,"poll describer set please provide the first question");
            //         TrackUtil.setState(msg.chat.id,Track.addQuestion,botMsgHandler.userTrack);
            //         break;
            //     case Track.addQuestion:
            //         bot.sendMessage(msg.chat.id,"poll question set please provide the first answer");
            //         TrackUtil.setState(msg.chat.id,Track.addAnswer,botMsgHandler.userTrack);
            //         break;
            //     case Track.addAnswer:
            //         bot.sendMessage(msg.chat.id,"poll answer set if you wanna add more go ahead otherwise use /endQuestion");
            //         TrackUtil.setState(msg.chat.id,Track.addAnswer,botMsgHandler.userTrack);
            //         break;
            //     default:
            //         bot.sendMessage(msg.chat.id,"sorry but you havenot needed a poll use /new to generate a poll together!!!");
            //         break;
            // }
            
        })
    }
}

