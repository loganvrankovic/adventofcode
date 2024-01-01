/* 
These methods for finding the LCM work with big numbers, which is
necessary for solving the problem. 
*/

// --alternative LCM function that handles negative numbers--
function findLCM(arr) {
    const gcd = (a, b) => (b ? gcd(b, a % b) : a);
    
    return arr.reduce((acc, i) => {
        return Math.abs(acc * i) / gcd(acc, i); 
    })
}
console.log(findLCM(lcmArr))


// --alternative LCM function without .reduce()--
function findLCM(arr, n) {
    function gcd(a, b) {
        if (b == 0) {
            return a;
        } else {
            return gcd(b, a % b);
        }
    }

    let ans = arr[0];

    for (let i = 1; i < n; i++) {
        ans = (((arr[i] * ans)) / 
                (gcd(arr[i], ans))); 
    }

    return ans;
}

let n = lcmArr.length;
console.log("the result is: " + findLCM(lcmArr, n)); 