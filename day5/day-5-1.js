var fs = require("fs");
var input = fs.readFileSync("input.txt", "utf-8");

var THREE_VOVELS = /.*[aeiou].*[aeiou].*[aeiou].*/i;
var DOUBLE_LETTERS = /.*([a-z])\1.*/i;
var NAUGHTY_LETTERS = /ab|cd|pq|xy/i;

var strings = input.split('\n');
var niceStrings = 0;
strings.forEach(function(string) {
    niceStrings += THREE_VOVELS.test(string) && DOUBLE_LETTERS.test(string) && !NAUGHTY_LETTERS.test(string);
});
console.log("Santas text file contains " + niceStrings + " nice strings.");
