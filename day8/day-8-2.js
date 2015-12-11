var fs = require("fs");
var input = fs.readFileSync("input.txt", "utf-8");
var input = input.split("\n");

var total = 0;

input.forEach(function(line) {
    var out = "\"";
    for (var i = 0; i < line.length; i++) {
        var char = line[i];
        switch(char) {
        case "\"":
            out += "\\\"";
            break;
        case "\\":
            out += "\\\\";
            break;
        default: 
            out += char;
            break;
        }
    }
    out += "\"";
    
    console.log(line, "->", out);
    
    total += out.length - line.length;
});

console.log(total);