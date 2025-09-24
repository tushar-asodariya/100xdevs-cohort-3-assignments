const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config/config");

function adminMiddleware(req, res, next){

    const token = req.headers.token
    console.log(token)
    const isValidToken = jwt.verify(token, JWT_ADMIN_SECRET)

    if(!isValidToken)
    {

        res.status(403).json({
        
            message:'You are not signed in'
        })
    
    }

    req.adminId = isValidToken.id
    next()
}


module.exports = {

    adminMiddleware
}