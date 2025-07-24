/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  console.log(str)

  let lowerStrList = str.toLowerCase().replace(/[^a-z0-9]/g,'').split('')
  console.log(lowerStrList)

  let left = 0;
  let right = lowerStrList.length-1

  while(left<right){
    if(lowerStrList[left] !== lowerStrList[right])
      return false;
    left++;
    right--;
  }

  return true;
}

module.exports = isPalindrome;
