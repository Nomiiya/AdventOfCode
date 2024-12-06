const fs = require('fs');

main();

function main(){
    fs.readFile('./input.txt', {encoding: 'utf-8'}, (err, data) => {
        if(err) throw err;

        data = data.split('\n')
        var rules = new Map();
        var total = 0;
        var failTotal = 0;

        data.forEach(line => {
            if(line == "\r"){ return; }
            if(/\|/g.test(line)){
                var temp = line.split('|').map(n => parseInt(n));

                if(!rules.has(temp[1])){
                    rules.set(temp[1], [temp[0]]);
                }
                else{
                    var behind = rules.get(temp[1]);
                    behind.push(temp[0]);
                    rules.set(temp[1], behind);
                }
            }
            else{
                line = line.split(",").map(n => parseInt(n));
                var val = validateLine(line, rules)
                if(val.pass){
                    total += line[Math.floor((line.length - 1)/2)];
                }
                else{
                    while(!val.pass){
                        var t1 = line[val.failIndex];
                        var t2 = line[val.ruleIndex];
                        line[val.failIndex] = t2;
                        line[val.ruleIndex] = t1;
                        val = validateLine(line, rules);
                    }
                    failTotal += line[Math.floor((line.length - 1)/2)];
                }
            }
        });

        console.log("Puzzle 1 Answer: " + total);
        console.log("Puzzle 2 Answer: " + failTotal);
    })
}

function validateLine(line, rules){
    if(line == null || rules == null) return false;
    var pass = true;
    var failIndex = 0;
    var ruleIndex = 0; 
    
    line.forEach((num, index) => {
        if(index == line.length - 1){  }
        else{
            if(rules.has(num)){
                var temp = rules.get(num);
                temp.forEach(rule => {
                    if(line.includes(rule) && (index < line.indexOf(rule))){
                        pass = false;
                        failIndex = index;
                        ruleIndex = line.indexOf(rule);
                    }
                })
            }
        }   
    })

    return {pass, failIndex, ruleIndex};
}