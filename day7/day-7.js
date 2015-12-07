var fs = require("fs");
var input = fs.readFileSync("input.txt", "utf-8");

var instructions = input.split('\n');

var Operator = {
    And: function(x, y) {
        return x & y;
    },
    Or: function(x, y) {
        return x | y;
    },
    Not: function(x) {
        return ~x;
    },
    LeftShift: function(x, s) {
        return x << s;
    },
    RightShift: function(x, s) {
        return x >>> s;
    },
    Set: function(x) {
        return x;
    }
};

Operator.And.title = "AND";
Operator.Or.title = "OR";
Operator.Not.title = "NOT";
Operator.LeftShift.title = "LSHIFT";
Operator.RightShift.title = "RSHIFT";
Operator.Set.title = "SET";

var wires = [];

function getWireFn(wire) {
    var fn = function() {
        return wires[wire];
    };
    fn.title = "getWire";
    fn.wire = wire;
    return fn;
}

function getValueFn(value) {
    var fn = function() {
        return value;
    };
    fn.title = "getValue";
    fn.value = value;
    return fn;
}

function mapFn(fun) {
    return fun ? fun() : undefined;
}

var FORMAT = /(([0-9a-z]+)|(([0-9a-z]+) (AND|OR) ([0-9a-z]+))|(([0-9a-z]+) (RSHIFT|LSHIFT) ([0-9]+))|((NOT) ([0-9a-z]+))) -> ([a-z]+)/;

function parseArg(argument) {
    return isNaN(argument) ? getWireFn(argument) : getValueFn(argument * 1);
}

function parseInstruction(instruction) {
    var res = FORMAT.exec(instruction);
    var operator, arguments = null, target;
    if (res) {
        if (res[2]) {
            operator = Operator.Set;
            arguments = [parseArg(res[2])];
        } else if (res[3]) {
            switch (res[5]) {
            case "AND":
                operator = Operator.And;
                break;
            case "OR":
                operator = Operator.Or;
                break;
            }
            arguments = [parseArg(res[4]), 
                         parseArg(res[6])];
        } else if (res[7]) {
            switch (res[9]) {
            case "LSHIFT": 
                operator = Operator.LeftShift;
                break;
            case "RSHIFT":
                operator = Operator.RightShift;
                break;
            }
            arguments = [parseArg(res[8]), 
                         parseArg(res[10])];
        } else if (res[11] && res[12] === "NOT") {
            operator = Operator.Not;
            arguments = [parseArg(res[13])];
        }
    
        target = res[14];
    }
    
    return {
        operator: operator,
        args: arguments,
        target: target
    };
}

instructions = instructions.map(parseInstruction);

wires["a"] = undefined;


function run() {
    do {
        instructions.forEach(function(instruction) {
            //console.log(instruction);
            var args = instruction.args.map(mapFn);
            if (args.indexOf(undefined) >= 0) {
                return;
            }
            if (wires[instruction.target]) {
                return;
            }
            console.log("Calling " + instruction.operator.title + " with args", args, "target =", instruction.target);
            var value = instruction.operator.apply(instruction.operator, args);
            console.log("=", value);
            wires[instruction.target] = value;
        });
    } while (wires["a"] === undefined);
}

run();

var value = wires["a"];
console.log("a =", value);

var ins = instructions.filter(function(ins) {
    return ins.target == "b";
})[0];
ins.operator = Operator.Set;
ins.args = [parseArg(value)];

wires = [];
wires["a"] = undefined;
run();
console.log("a =", wires["a"]);