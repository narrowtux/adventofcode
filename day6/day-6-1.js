var fs = require("fs");
var input = fs.readFileSync("input.txt", "utf-8");

var instructions = input.split('\n');

function parseInstruction(instruction) {
    var action = "";
    if (instruction.startsWith("turn on")) {
        action = "+";
    } else if (instruction.startsWith("turn off")) {
        action = "-";
    } else if (instruction.startsWith("toggle")) {
        action = "~";
    }
    
    var area = {
        from: {
            x: 0,
            y: 0
        }, 
        to: {
            x: 0,
            y: 0
        }
    };
    
    var words = instruction.split(" ");
    var from = words[words.length - 3];
    var to = words[words.length - 1];
    from = from.split(",");
    to = to.split(",");
    area.from.x = from[0] * 1;
    area.from.y = from[1] * 1;
    area.to.x = to[0] * 1;
    area.to.y = to[1] * 1;
    
    return {
        action: action,
        area: area
    };
}

instructions = instructions.map(parseInstruction);

var lights = [];
for (var i = 0; i < 1000; i++) {
    lights[i] = [];
    for (var x = 0; x < 1000; x++) {
        lights[i][x] = false;
    }
}

instructions.forEach(function(instruction) {
    for (var x = instruction.area.from.x; x <= instruction.area.to.x; x++) {
        for (var y = instruction.area.from.y; y <= instruction.area.to.y; y++) {
            switch(instruction.action) {
            case "+":
                lights[x][y] = true;
                break;
            case "-":
                lights[x][y] = false;
                break;
            case "~":
                lights[x][y] = ! lights[x][y];
                break;
            }
        }
    }
});

var lightsOn = 0;
for (var x = 0; x < 1000; x++) {
    for (var y = 0; y < 1000; y++) {
        lightsOn += lights[x][y];
    }
}

console.log(lightsOn + " lights are on.");