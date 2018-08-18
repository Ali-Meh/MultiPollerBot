import telegram from 'node-telegram-bot-api';
import {botMsgHandler} from './msgHandler'
import pollingHandler from './PollingHandler';
// import Tcfg from '../Config/Tcfg';
let tcfg;
try {
    tcfg=require('../Config/Tcfg');
    console.log(JSON.stringify(tcfg,undefined,4));
    
    
} catch (error) {
    if(!process.env.ApiKey){
        console.error("You Haven't Specifide Config files nor Env's Go To read Me and specify the wanted Envirement Variables Or Create Config Files wanted ");
    }
}

/*****************************************************************if you wanna WebHook comment this part and run web Dyno************************************/
/** web hook to run */
// @ts-ignore
const options:telegram.ConstructorOptions = {
    webHook:{port:process.env.PORT}
  };
  let ApiKey=process.env.ApiKey||tcfg.getApi()
  let bot=new telegram(ApiKey,options);



const url = process.env.APP_URL || tcfg.getHerokuUrl();
console.log("server started Running on "+url);
bot.setWebHook(`${url}/bot${ApiKey}`);
console.log(`the webhook set to ${url}/bot${ApiKey} `);

/*****************************************************************if you wanna poll comment this part and Run the Worker Dynos************************************/

/***************************if Gonna use Polling UnComment This Part*****************************************/
// let ApiKey=process.env.ApiKey||tcfg.getApi();
// let bot=new telegram(ApiKey,{polling:true});
/***************************if Gonna use Polling UnComment This Part*****************************************/


bot.getMe().then((telbot)=>{
    console.log("Seccess Fully Connected To Telegram Api");
    
    console.log(JSON.stringify(telbot,undefined,4));
    
})

new pollingHandler(bot);

let msghndl=new botMsgHandler(bot);  




