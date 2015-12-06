var fs = require("fs");
var input = fs.readFileSync("input.txt", "utf-8");

var gifts = input.split("\n");

var area = 0;
var ribbon = 0;
gifts.forEach(function(gift) {
    var dimensions = gift.split("x");
    var side1 = dimensions[0] * dimensions[1];
    var side2 = dimensions[1] * dimensions[2];
    var side3 = dimensions[2] * dimensions[0];
    
    var smallest = Math.min(side1, Math.min(side2, side3));
    area += smallest + (side1 + side2 + side3) * 2;
    
    var perimeter1 = dimensions[0] * 2 + dimensions[1] * 2;
    var perimeter2 = dimensions[1] * 2 + dimensions[2] * 2;
    var perimeter3 = dimensions[2] * 2 + dimensions[0] * 2;
    smallest = Math.min(perimeter1, Math.min(perimeter2, perimeter3));
    ribbon += smallest + dimensions[0] * dimensions[1] * dimensions[2];
});

console.log("Total paper: " + area + " square feet");
console.log("Total ribbon: " + ribbon + " feet");