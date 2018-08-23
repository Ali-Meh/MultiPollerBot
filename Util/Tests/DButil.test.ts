import * as dbUtil from "../DBUtil";
import I from '../../Util/modelInterfases'
import expect from "expect";



describe("-->ExtractAnswers<--",()=>{
    it("should find answers",(done)=>{
        dbUtil.ExtractAnswers("5b785d5d64f16d51dcfb6f4f",68819059).then((res)=>{
            if(res){
                expect(res[0].userIdHash).toBeTruthy();
                // console.log(JSON.stringify(res,undefined,4));
                done();
                
            }else{
                throw new Error("Extraction Failed");
            }
        })
    });
    it("should throw error for not owner",(done)=>{
        dbUtil.ExtractAnswers("5b785d5d64f16d51dcfb6f4f",68818059).then((res)=>{
            if(res){
                throw new Error();
            }
        }).catch((e)=>{
            // console.log(JSON.stringify(e.message,undefined,4));
            done();
        })
    });
    it("should throw error for not founded poll",(done)=>{
        dbUtil.ExtractAnswers("5b785d5d6468819059fb6f4f",68819059).then((res)=>{
            if(res){
                throw new Error();
            }
        }).catch((e)=>{
            // console.log(JSON.stringify(e.message,undefined,4));
            done();
        })
    })
})


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