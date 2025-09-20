const express = require("express")

const app = express();

app.use(express.json())

app.get('/', function(req, res){

    res.sendFile(__dirname+'/public/index.html');

})

app.post('/sum', function(req,res){

    const a = Number(req.body.a)
    const b = Number(req.body.b)
    const sum = a+b
    console.log(sum)
    res.json({ 
      sum: `Sum is ${sum}`
    });

})

app.listen(3000)

console.log('http://localhost:3000/')