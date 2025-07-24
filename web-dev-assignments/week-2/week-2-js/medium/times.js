/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
There is no automated test for this one, this is more for you to understand time goes up as computation goes up
*/

function calculateTime(n) {
  const startTime = performance.now(); // Start timer

  // const totalSum = (n*(n+1))/2;
  // console.log(totalSum)
  let sum = 0;
  for (let i = 0; i <= n; i++) {
    sum += i;
  }
  const endTime = performance.now(); // end timer

  let diffSec = Math.abs(endTime - startTime) / 1000;

  return diffSec;
}

console.log(calculateTime(120100123499));
