import *  as dbhandler from '../DBHandler';
import I from '../../Util/modelInterfases';
import expect from 'expect';







describe("--> DBHandler Tests <--",()=>{
    describe("adding answers",()=>{
        let newPoll:I.IAnswers={
            pollId:"Poll Number 1",
            user:{userIdHash:"userHash1",answers:[{questionID:"Question1",answerId:1}]}
        };
        let newUser:I.IAnswers={
            pollId:"Poll Number 1",
            user:{userIdHash:"userHash2",answers:[{questionID:"Question1",answerId:2}]}
        };
        let newanswer:I.IAnswers={
            pollId:"Poll Number 1",
            user:{userIdHash:"userHash1",answers:[{questionID:"Question2",answerId:11}]}
        };




        it("should add new Poll and user to db",(done)=>{
            dbhandler.addAnswer(newPoll).then((A:I.InfAnswers|null)=>{
                if(A){
                    expect(A.pollId).toEqual(newPoll.pollId);
                    // expect(A.users).toContain(newPoll.user);
                    done();
                }else{
                    throw new Error("not saved to DB!!!");
                    done();
                }
            });
        });

        it("should add new user to the polls Answers",(done)=>{//bug 
            dbhandler.addAnswer(newUser).then((A:I.InfAnswers|null)=>{
                if(A){
                    // expect(newUser.user).toInclude(A.users[1])
                    // expect(A.users).toContain(newPoll.user);
                    done();
                }else{
                    throw new Error("not saved to DB!!!");
                    done();
                }
            })
        });
        it("shoild existing user's new answer",(done)=>{
            dbhandler.addAnswer(newanswer).then((A:I.InfAnswers|null)=>{
                if(A){
                    // expect(A.pollId).toEqual(newPoll.pollId);
                    // expect(A.users.filter((user)=>{user.userIdHash===newUser.user.userIdHash})).toEqual(newUser.user);
                    // expect(A.users).toContain(newPoll.user);
                    done();
                }else{
                    throw new Error("not saved to DB!!!");
                    done();
                }
            })
        });
    })






})