import express from 'express'

const app = express()

function isOldEnough(age){

    if(age>18){
        return true
    } else{
        return false;
    }

}

function isOldEnoughMiddleware(req, res, next){

    if(req.query.age>18){
        next()
    } else{
        res.status(411).json(
            {
                message: "Sorry you are not of age yet"
            }
        )
    }

}

app.get('/ride1',isOldEnoughMiddleware, function(req, res){

        res.json({
            message : "You have successfully done ride 1"
        })
    
})

app.get('/ride2',isOldEnoughMiddleware, function(req, res){

   
        res.json({
            message : "You have successfully done ride 2"
        })
   
})

app.listen(3000)
