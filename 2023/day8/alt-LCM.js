// --alternative (more readable) LCM function--
function gcd(a, b) {
    if (b == 0) {
        return a;
    } else {
        return gcd(b, a % b);
    }
}

function findLCM(arr, n) {
    let ans = arr[0];

    for (let i = 1; i < n; i++) {
        ans = (((arr[i] * ans)) / 
                (gcd(arr[i], ans))); 
    }

    return ans;
}

let n = lcmArr.length;
console.log("the result is: " + findLCM(lcmArr, n)); 