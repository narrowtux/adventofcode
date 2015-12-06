var fs = require("fs");
var input = fs.readFileSync("input.txt", "utf-8");

var LETTER_PAIRS = /([a-z]{2}).*\1/i;
var LETTER_REPEAT = /([a-z]).\1/i;

var strings = input.split('\n');
var niceStrings = 0;
strings.forEach(function(string) {
    niceStrings += LETTER_PAIRS.test(string) && LETTER_REPEAT.test(string);
});
console.log("Santas text file contains " + niceStrings + " nice strings.");
