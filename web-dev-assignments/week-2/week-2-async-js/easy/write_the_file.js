const fs = require('fs')
const path = require('path');

function afterFileRead(err){

    if(err){
    
        console.log('Something went wrong')
    }else{
        console.log('File written successfully at', filePath)
    }

}
const filePath = path.join(__dirname, 'write_data.md');


fs.writeFile(filePath,'This is demo data','utf8', afterFileRead)