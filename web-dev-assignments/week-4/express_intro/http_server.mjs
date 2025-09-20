import express from 'express'

const app = express()


app.get('/multiply', (req, res)=>{

    res.status(200).json({
        "data": {
            "multiply_result": Number(req.query.a) * Number(req.query.b)
        }
    })

})
app.get('/addition', (req, res)=>{

    res.status(200).json({
        "data": {
            "addition_result": Number(req.query.a) + Number(req.query.b)
        }
    })

})

app.get('/subtract', (req, res)=>{

    res.status(200).json({
        "data": {
            "subtract_result": Number(req.query.a) - Number(req.query.b)
        }
    })

})

app.get('/divide', (req, res)=>{

    res.status(200).json({
        "data": {
            "division_result": Number(req.query.a) / Number(req.query.b)
        }
    })

})


app.listen(3000 , () => {
console.log('Server is running on http://localhost:3000');
})