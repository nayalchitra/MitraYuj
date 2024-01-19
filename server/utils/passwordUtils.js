
const {genSalt,hash,compare} = require("bcrypt");

const createPasswordHash = async(password)=>{
    const salt = await genSalt();
    const pwdHash = hash(password, salt);
    console.log({pwdHash});
    return pwdHash;
}


const verifyPassword = async(password,pwdHash)=>{

    const verified = await compare(password,pwdHash);
    console.log(verified);
    return verified;
}


// (async()=>{
//     const hashedPWD = "$2b$10$I8DkPb5zgc7qdI6UqfrtDeJy5YgXuA3IxrrTpoeA.D.whF2AcS4Cy"// await createPasswordHash("abcd");
//     //$2b$10$I8DkPb5zgc7qdI6UqfrtDeJy5YgXuA3IxrrTpoeA.D.whF2AcS4Cy
//     const isVerified = await verifyPassword("abcd",hashedPWD);
//     console.log(isVerified);

// })()


module.exports = {createPasswordHash, verifyPassword};