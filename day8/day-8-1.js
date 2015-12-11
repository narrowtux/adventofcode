var fs = require("fs");
var input = fs.readFileSync("input.txt", "utf-8");
var totalChars = 0;
var totalLiterals = 0;

var input = input.split("\n");
input.forEach(function (line) {
    var escape = false;
    var inString = false;
    var hex = null;
    var out = "";
    for (var i = 0; i < line.length; i++) {
        var char = line[i];
        switch (char) {
        case "\"":
            if (!inString) {
                inString = true;
            } else if (escape) {
                out += "\"";
                escape = false;
                totalLiterals ++;
            } else {
                inString = false;
            }
            break;
        case "\\":
            if (!escape) {
                escape = true;
            } else {
                out += "\\";
                escape = false;
                totalLiterals ++;
            }
            break;
        case "x":
            if (escape) {
                hex = "";
                escape = false;
                break;
            }
        default:
            if (hex != null) {
                hex += char;
            }
            if (hex != null) {
                if (hex.length == 2) {
                    out += String.fromCharCode(parseInt(hex, 16));
                    hex = null;
                    totalLiterals ++;
                }
            } else {
                out += char;
                totalLiterals ++;
            }
            break;
        }
    }
    console.log(line, "->", out);
    totalChars += line.length;
});

console.log((totalChars - totalLiterals));