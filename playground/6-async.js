// Wait 2 seconds before running the function
// const print = (number) => {
//     setTimeout(() => {
//         if(number > 10){
//             return;
//         }
//         console.log(number);
//         print(++number)
//     }, (number%2==0)?2000:1000)
// }

//const wait = (time, ())
const wait = (time, callback = (error, done) => {
    
    if(time < 0){
        console.log("Ms invalid");
        error = true;
        done = false;
        return error, done;
    }
    else{
        console.log('yeah');
        done = true;
        error = false;
        return error, done;
    }
}) => {
  setTimeout(() => {
    callback((time < 0)?1:0, !(time < 0)?1:0);
  }, time);
};

wait(1000, (error, done) => {
    if(error)
        console.log("Ms invalid");
    else if(done)
        console.log("yeah");
});
//print(1);
