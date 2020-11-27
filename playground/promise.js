function getRandomNumber([Min, Max]) {
  const Range = Max - Min;
  const Rand = Math.random();
  const tmp = Min + Math.round(Rand * Range);
  if (typeof Min || typeof Max) {
    return new Promise(function (resolve, reject) {
      resolve(tmp);
    });
  } else {
    return new Promise(function (resolve, reject) {
      throw new Error("input");
    });
  }
}
function checkOddNumber(num) {
  return new Promise(function (resolve, reject) {
    const isOdd = !!(num%2)
    resolve([num, isOdd])
  });
}

getRandomNumber(["B", "C"])
  .then(checkOddNumber)
  .then((theNumber) => {
    if(isOdd)
      console.log(`${theNumber} is an odd number`);
    else
    console.log(`${theNumber} is an even number`);
  })
  .catch((error) => {
    console.log(`Number is not a number`);
  });
