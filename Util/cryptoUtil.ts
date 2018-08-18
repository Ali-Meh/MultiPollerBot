import crypto from 'crypto';


function GenHash(Userid:number){
    
    let sha1=crypto.createHash("sha512");
    sha1.update(Userid.toString(),'ascii');
    sha1.update(GenSalt(Userid),'ascii');
    let hash=sha1.digest('base64');    
    return hash;
}

function GenSalt(Userid:number){
    let md5=crypto.createHash("sha256");
    md5.update(Userid.toString());
    return md5.digest('hex');
}


export default GenHash;