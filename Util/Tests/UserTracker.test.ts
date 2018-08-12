import {UserTrack,Track,TrackUtil} from '../UserTracker';
import expect from 'expect';
var userTrack:UserTrack[];

beforeEach(()=>{
    userTrack=new Array();

    userTrack.push({userid:12356852,trace:Track.new});
    userTrack.push({userid:35436563,trace:Track.polldescriber});
    userTrack.push({userid:56756734,trace:Track.addAnswer});
    userTrack.push({userid:23423425,trace:Track.addQuestion});
    userTrack.push({userid:75756716,trace:Track.new});


    TrackUtil.usrlst.push({userid:12356852,trace:Track.new});
    TrackUtil.usrlst.push({userid:35436563,trace:Track.polldescriber});
    TrackUtil.usrlst.push({userid:56756734,trace:Track.addAnswer});
    TrackUtil.usrlst.push({userid:23423425,trace:Track.addQuestion});
    TrackUtil.usrlst.push({userid:75756716,trace:Track.new});
})



describe("userTracker Utililty test...",()=>{
    describe("with costume list",()=>{

        it("should add new user to the list and give the list back",()=>{
            // userTrack=new Array();
            let user={userid:852456852,trace:Track.new}
            TrackUtil.setState(user.userid,user.trace,userTrack);
    
            let userReturned=TrackUtil.FindState(user.userid,userTrack);
            // console.log(JSON.stringify(userReturned,undefined,4));
            
            expect(userReturned.trace).toEqual(user.trace);
        });
        
        it("should find the user with the specified data",()=>{
            let userstate=TrackUtil.FindState(23423425,userTrack);
            expect(userstate.trace).toEqual(Track.addQuestion)
        });
    
        it("should change the state of existing user",()=>{
            let userid=35436563;
            let userstate=TrackUtil.FindState(userid,userTrack);
            expect(userstate.trace).toEqual(Track.polldescriber);
            TrackUtil.setState(userid,Track.addAnswer,userTrack);
            userstate=TrackUtil.FindState(userid,userTrack);
            expect(userstate.trace).toEqual(Track.addAnswer);
        })
    
    })

    describe("without any list",()=>{
        it("should add new user to the list and give the list back",()=>{
            // userTrack=new Array();
            let user={userid:852456852,trace:Track.new}
            TrackUtil.setState(user.userid,user.trace);
    
            let userReturned=TrackUtil.FindState(user.userid);
            // console.log(JSON.stringify(userReturned,undefined,4));
            
            expect(userReturned.trace).toEqual(user.trace);
        });
        
        it("should find the user with the specified data",()=>{
            let userstate=TrackUtil.FindState(23423425);
            expect(userstate.trace).toEqual(Track.addQuestion)
        });
    
        it("should change the state of existing user",()=>{
            let userid=35436563;
            let userstate=TrackUtil.FindState(userid);
            expect(userstate.trace).toEqual(Track.polldescriber);
            TrackUtil.setState(userid,Track.addAnswer);
            userstate=TrackUtil.FindState(userid);
            expect(userstate.trace).toEqual(Track.addAnswer);
        })
    })

})