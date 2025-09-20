
const jwt = require("jsonwebtoken")
const zod = require("zod")

//decode, verify, generate

const value = {
    name:"Tushar",
    accountNumber:"34839839439434"
}

const emailSchema = zod.string().email()
const passwordSchema = zod.string().min(6)
const secret = "SCRETSTR"


function signJwt(username, password){
    const userNameResp = emailSchema.safeParse(username)
    const passwordResp = passwordSchema.safeParse(password)
    if(!userNameResp.success || !passwordResp.success) return null;

    return jwt.sign(username, secret)
}

function verify(token){
try{
    const verified = jwt.verify(token, secret)
    
        return verified
    
}catch(e){
    return false
}

}

function decodeJwt(token)
{
    const decoded = jwt.decode(token)
    if(decoded) {
        return decoded
    }else{
        return false
    }

}
const token = signJwt("sfsd@sdf.sdf","sdfssdfsfd")

console.log(token)
console.log("decoded")
console.log(decodeJwt(token))
console.log("Verified")

console.log(verify(token))

