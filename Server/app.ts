import telegram from 'node-telegram-bot-api';
import {botMsgHandler} from './msgHandler'
import pollingHandler from './PollingHandler';

const Tcfg=require('./../Config/Tcfg.json');


/** web hook to run */
// const options = {
//     webHook: {
//       port: process.env.PORT
//     }
//   };
// TOKEN=process.env.telToken||cfg.getToken();
// var bot=new telegram(TOKEN,options);



// const url = process.env.APP_URL || cfg.herokuUrl;
// console.log("server started Running");
// bot.setWebHook(`${url}/bot${TOKEN}`);
// console.log(`the webhook set to ${url}/bot${TOKEN} `);

let bot=new telegram(Tcfg.botApi,{polling:true});

// bot.on("message",(args)=>{
//     console.log(JSON.stringify(args,undefined,4));
    
// })

new pollingHandler(bot);

let msghndl=new botMsgHandler(bot);  




