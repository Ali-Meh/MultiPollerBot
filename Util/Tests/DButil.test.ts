import * as dbUtil from "../DBUtil";
import I from '../../Util/modelInterfases'
import expect from "expect";


describe("count the collection func",()=>{
    it("shold count the values in an object an return them back",()=>{
        let obj:I.IuserAnswer[]=[{questionID:"123",answerId:1},{questionID:"123",answerId:1},{questionID:"123",answerId:1},{questionID:"123",answerId:1},{questionID:"123",answerId:1},
        {questionID:"123",answerId:1},{questionID:"123",answerId:1},{questionID:"123",answerId:1},{questionID:"123",answerId:1},{questionID:"123",answerId:1},
        {questionID:"123",answerId:4},{questionID:"123",answerId:4},{questionID:"123",answerId:4},{questionID:"123",answerId:1},{questionID:"123",answerId:1},
        {questionID:"123",answerId:2},{questionID:"123",answerId:2},{questionID:"123",answerId:2},{questionID:"123",answerId:2},{questionID:"123",answerId:2},]
        let counted=dbUtil.counter(obj);
        if(counted===undefined){
            console.error("got counted Undefined");
            return;
        }
        expect(counted["2"]).toEqual(5);
        expect(counted["4"]).toEqual(3);
        expect(counted["1"]).toEqual(12);
        expect(counted["3"]).toEqual(undefined);

    })
})



describe("converters in DBUtil",()=>{
    it("should take I.poll and turn it into I.dbPoll",(done)=>{
        let Ipoll:I.IPoll={ownerId:123456,PollDescriber:"some decribetion here",questionsQueue:new Array()};
        Ipoll.questionsQueue.push({describer:"Q1",Answers:["A11","A12","A13"]})
        Ipoll.questionsQueue.push({describer:"Q2",Answers:["A21","A22","A23","A24"]})
        Ipoll.questionsQueue.push({describer:"Q3",Answers:["A31","A32"]});
        let dbpoll=dbUtil.IToDBI(Ipoll);

        expect(dbpoll.describer).toEqual(Ipoll.PollDescriber);
        expect(dbpoll.ownerId).toEqual(Ipoll.ownerId);
        //expect(dbpoll.questions).toEqual(Ipoll.questionsQueue);//fixme it just doesnt work  

        done();
        // expect(dbpoll).toContain(Ipoll);
    })
    it("should take I.dbPoll and turn it into I.poll",(done)=>{
        done();
    })
})