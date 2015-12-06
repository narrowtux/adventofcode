var fs = require("fs");
var input = fs.readFileSync("input.txt", "utf-8");
var i = 0;
for (j = 0; j < input.length; j++) {
        if (input[j] == '(') {
                i++;
        } else if (input[j] == ')') {
                i--;
        }
        if (i == -1) {
                console.log("Basement at " + (j + 1));
        }
}

console.log("Level " + i);
