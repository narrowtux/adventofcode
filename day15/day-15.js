var fs = require("fs");
var input = fs.readFileSync("input.txt", "utf-8");

var PATTERN = /([a-zA-Z]+): capacity (-?[0-9]+), durability (-?[0-9]+), flavor (-?[0-9]+), texture (-?[0-9]+), calories (-?[0-9]+)/;
var ingredients = input.split("\n").map(function(line) {
    var res = PATTERN.exec(line);
    return {
        name: res[1],
        mods: {
            capacity: res[2] * 1,
            durability: res[3] * 1,
            flavor: res[4] * 1,
            texture: res[5] * 1,
            calories: res[6] * 1
        }
    };
});

var part2 = true;

var highest = 0;
var highestSet = {};

function pos(val) {
    if (val > 0) {
        return val;
    } 
    return 0;
}
function sum(a, b) {return a+b}
function calculate(set, step) {
    var left = 100 - set.reduce(sum, 0);
    var start = 0;
    if (step == ingredients.length - 1) {
        start = left;
    }
    for (var i = start; i <= left; i++) {
        var set2 = set.slice();
        set2[step] = i;
        if (step < ingredients.length - 1) {
            calculate(set2, step + 1);
        } else {
            //console.log(set2);
            var reduced = {
                capacity: 0,
                durability: 0,
                flavor: 0,
                texture: 0,
                calories: 0
            };
            for (var j = 0; j < ingredients.length; j++) {
                reduced.capacity += set2[j] * ingredients[j].mods.capacity;
                reduced.durability += set2[j] * ingredients[j].mods.durability;
                reduced.flavor += set2[j] * ingredients[j].mods.flavor;
                reduced.texture += set2[j] * ingredients[j].mods.texture;
                reduced.calories += set2[j] * ingredients[j].mods.calories;
            }
            if (part2 && reduced.calories != 500) continue;
            if (reduced.capacity < 0 || reduced.durability < 0 || reduced.flavor < 0 || reduced.texture < 0 || reduced.calories < 0) continue;
            var total = reduced.capacity * reduced.durability * reduced.flavor * reduced.texture;
            if (total > highest) {
                highest = total;
                highestSet = set2;
            }
        }
    }
}

var set = [];
for (var i = 0; i < ingredients.length; i++) set.push(0);

calculate(set, 0);

console.log(highest, highestSet);