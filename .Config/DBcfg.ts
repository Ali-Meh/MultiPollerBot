let baseUri='Your Mongo DataBase  address';
let username='userName';
let Password='Password';



var configs={
    geturl(){
        // console.log(`mongodb://${username}:${Password}${baseUri}`);
        return `mongodb://${username}:${Password}${baseUri}`;},
}


export default configs;

