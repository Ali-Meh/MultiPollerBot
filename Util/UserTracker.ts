import { Collection } from "../node_modules/@types/mongodb";

export enum Track{
    new,
    polldescriber,
    addQuestion,
    addAnswer,
}
export interface UserTrack{
    userid:number,
    trace:Track
}

export class TrackUtil{
    static usrlst:UserTrack[]=new Array();


    static FindState(userID:number,list:UserTrack[]=TrackUtil.usrlst):UserTrack{
        let user = list.filter((user)=>user.userid===userID);
        return user[0];
    }
    static setState(userID:number,state:Track,list:UserTrack[]=TrackUtil.usrlst):UserTrack{
        let user = this.FindState(userID,list);
        if(user){
            user.trace=state;
        }else{
            list.push({userid:userID,trace:state})
            user = this.FindState(userID,list);
        }
        return user;
    }
}

