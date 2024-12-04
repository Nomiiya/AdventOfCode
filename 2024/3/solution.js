const fs = require('fs');

main();

function main(){
    fs.readFile('./input.txt', {encoding: 'utf-8'}, (err, data) =>{
        if(err) throw err;

        const mulMatch = /(mul\(\d+,\d+\))/g;
        const digits = /\d+/g;
        var p1Answer = 0;

        const dodoo = /don't\(\)|do\(\)|(mul\(\d+,\d+\))/g;
        const dodont = /don't\(\)|do\(\)/g;
        var p2Answer = 0;

        data.matchAll(mulMatch).forEach(item =>{
            p1Answer += (item[0].match(digits)[0] * item[0].match(digits)[1]);
        })

        var enabled = true;
        data.matchAll(dodoo).forEach(item => {
            if(dodont.test(item[0])){
                if(item[0] == 'do()') enabled = true;
                else enabled = false;
            }else{
                if(enabled){
                    p2Answer += (item[0].match(digits)[0] * item[0].match(digits)[1]);
                }
            }
        })

        console.log("Puzzle 1 Answer: " + p1Answer);
        console.log("Puzzle 2 Answer: " + p2Answer);
    })
}
