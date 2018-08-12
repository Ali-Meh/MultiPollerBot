import {pollMaker} from '../pollMaker';
import expect from 'expect';



describe("poll maker Tests...",()=>{

    it("should add new question to the question queue",()=>{
        let userinfo={userId:12589635,pollDes:"poll des 1",question1:"Q1",
        answers:["A1","A2"],question2:"Q2",answers2:["A2","A3","A4"]};
        let poll=pollMaker.userPoll(userinfo.userId,userinfo.pollDes);
        poll.AddQuestion(userinfo.question1);
        userinfo.answers.forEach((answer)=>{
            poll.addAnswers(answer);
        })
        poll.AddQuestion(userinfo.question2);
        userinfo.answers2.forEach((answer)=>{
            poll.addAnswers(answer);
        })
        let ReturnedPoll=pollMaker.userPoll(userinfo.userId,"noPollYet");
        expect(ReturnedPoll.ownerId).toEqual(userinfo.userId);
        expect(ReturnedPoll.PollDescriber).toEqual(userinfo.pollDes);
        expect(ReturnedPoll.questionsQueue.length).toEqual(2);
        expect(ReturnedPoll.questionsQueue[0].Answers.length).toEqual(userinfo.answers.length);
        expect(ReturnedPoll.questionsQueue[1].Answers.length).toEqual(userinfo.answers2.length);


    });




})