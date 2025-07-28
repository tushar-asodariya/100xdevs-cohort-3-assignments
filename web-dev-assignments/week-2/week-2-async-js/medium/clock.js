
const updateClock = (fromSetTimer = false)=>{
 const currentTime = new Date();

    const hours24 = currentTime.getHours().toString().padStart(2,'0')
    const minutes = currentTime.getMinutes().toString().padStart(2,'0')
    const seconds = currentTime.getSeconds().toString().padStart(2,'0')

    const hours12 = ((currentTime.getHours() + 11) % 12 + 1).toString().padStart(2, '0');
    const ampm = currentTime.getHours() >= 12 ? 'PM' : 'AM';

    console.log(`24-hour format: ${hours24}:${minutes}:${seconds}`);
    console.log(`12-hour format: ${hours12}:${minutes}:${seconds} ${ampm}`);
    if(!fromSetTimer){
        setTimeout(updateClock, 1000)
    }
}   

// updateClock(true)

setInterval(updateClock, 1000, true)