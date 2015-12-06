var fs = require("fs");
var input = fs.readFileSync("input.txt", "utf-8");

var houses = [];
var delivered = 0;
function initHouse(x, y) {
    var col = houses[x];
    if (!col) {
        houses[x] = [];
    }
    if (!houses[x][y]) {
        houses[x][y] = 0;
        delivered ++;
    }
}


var santas = [
    {
        name: "Santa",
        x: 0,
        y: 0
    }, {
        name: "Robo-Santa",
        x: 0,
        y: 0
    }
];
var currentSanta = 0;
initHouse(0, 0);
houses[0][0] += 2;
for (i = 0; i < input.length; i++) {
    var santa = santas[currentSanta];
    switch(input[i]) {
    case ">":
        santa.x++;
        break;
    case "<":
        santa.x--;
        break;
    case "^":
        santa.y++;
        break;
    case "v":
        santa.y--;
        break;
    }
    
    initHouse(santa.x, santa.y);
    houses[santa.x][santa.y]++;
    
    currentSanta ++;
    if (currentSanta == santas.length) {
        currentSanta = 0;
    }
}

console.log("Delivered to " + delivered + " houses.");

