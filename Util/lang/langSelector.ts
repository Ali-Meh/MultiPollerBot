import {langFinder,langSetter} from '../DBUtil';

//todo


export default function lang(setLang?:string){
    if(setLang){//set the lang

    }else{//get lang
        let lang;
        try {
            lang=require('./en-UK.json');
        } catch (error) {
            console.log("no lang file detected switchin to defualt");
            lang=require('./en-US.json');
        }


        
        return lang;

        
    }
}
