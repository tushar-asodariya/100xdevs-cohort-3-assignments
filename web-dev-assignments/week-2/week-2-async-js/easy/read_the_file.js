const fs = require('fs')
const path = require('path');

function afterFileRead(err, data){

    if(err){
    
        console.log('Something went wrong')
    }else{
        console.log(data)
    }

}
const filePath = path.join(__dirname, '3-read-from-file.md');


fs.readFile(filePath,'utf8', afterFileRead)