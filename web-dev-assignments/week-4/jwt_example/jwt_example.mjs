import jsonwebtoken from 'jsonwebtoken'

const jwt = jsonwebtoken()

//decode, verify, generate

const value = {
    name:"Tushar",
    accountNumber:"34839839439434"
}

const secret = "SCRETSTR"
//jwt
const token = jwt.sign(value, secret)
console.log(token)