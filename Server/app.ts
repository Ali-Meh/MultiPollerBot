import telegram from 'node-telegram-bot-api';
import {botMsgHandler} from './msgHandler'
import pollingHandler from './PollingHandler';
// import Tcfg from '../Config/Tcfg';
let tcfg;
try {
    tcfg=require('../Config/Tcfg');
    
} catch (error) {
    if(!process.env.ApiKey){
        console.error("You Haven't Specifide Config files nor Env's Go To read Me and specify the wanted Envirement Variables Or Create Config Files wanted ");
    }

}

/*****************************************************************if you wanna poll comment this  part ************************************/
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

/*****************************************************************if you wanna poll comment this  part ************************************/

let ApiKey=process.env.ApiKey||tcfg.getApi();

let bot=new telegram(ApiKey,{polling:true});

bot.getMe().then((telbot)=>{
    console.log("Seccess Fully Connected To Telegram Api");
    
    console.log(JSON.stringify(telbot,undefined,4));
    
})

new pollingHandler(bot);

let msghndl=new botMsgHandler(bot);  




