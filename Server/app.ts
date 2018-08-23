require('../Config/Config.ts');
import telegram from 'node-telegram-bot-api';
import {botMsgHandler} from './msgHandler'
import pollingHandler from './PollingHandler';

let bot:telegram;
//You wanna set web hooks We on it ;)
if(process.env.APP_URL){
    console.log("setting web hooks");
    // @ts-ignore
    const options:telegram.ConstructorOptions = {
        // @ts-ignore
        webHook:{port:process.env.PORT}
    };
    let ApiKey=process.env.ApiKey;
    // @ts-ignore
    bot=new telegram(ApiKey,options);
    const url = process.env.APP_URL;
    console.log("server started Running on "+url);
    bot.setWebHook(`${url}/bot${ApiKey}`);
    console.log(`the webhook set to ${url}/bot${ApiKey} `);
}else{
    console.log("Polling for bot");
    let ApiKey=process.env.ApiKey;
    // @ts-ignore
    bot=new telegram(ApiKey,{polling:true});
}

/*****************************************************************if you wanna WebHook comment this part and run web Dyno************************************/
/** web hook to run */
// // @ts-ignore
// const options:telegram.ConstructorOptions = {
//     webHook:{port:process.env.PORT}
//   };
//   let ApiKey=process.env.ApiKey;
// // @ts-ignore
//   let bot=new telegram(ApiKey,options);



// const url = process.env.APP_URL;
// console.log("server started Running on "+url);
// bot.setWebHook(`${url}/bot${ApiKey}`);
// console.log(`the webhook set to ${url}/bot${ApiKey} `);

/*****************************************************************if you wanna poll comment this part and Run the Worker Dynos************************************/

/***************************if Gonna use Polling UnComment This Part*****************************************/
    // let ApiKey=process.env.ApiKey;
    // // @ts-ignore
    // let bot=new telegram(ApiKey,{polling:true});
/***************************if Gonna use Polling UnComment This Part*****************************************/


    bot.getMe().then((telbot:any)=>{
        console.log("Seccess Fully Connected To Telegram Api");        
    })

    new pollingHandler(bot);

    let msghndl=new botMsgHandler(bot);  





