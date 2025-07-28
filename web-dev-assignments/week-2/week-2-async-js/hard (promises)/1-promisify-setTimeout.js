/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {
    let p = new Promise( (resolve)=>{
    setTimeout((n)=>{
    resolve()
        console.log(`promise output after ${n} seconds`)
    }, n*1000, n)

})

return p;
}


module.exports = wait;
