var md5 = require("./md5");
var input = "yzbqklnj";

var fiveFound = false;
var sixFound = false;
var i = 0;
while(true) {
    var hash = md5.digest_s(input + i);
    if (!fiveFound && hash.startsWith("00000")) {
        console.log(i + " generates the hash " + hash);
        fiveFound = true;
    }
    if (!sixFound && hash.startsWith("000000")) {
        console.log(i + " generates the hash " + hash);
        sixFound = true;
    }
    if (fiveFound && sixFound) {
        break;
    }
    i++;
}