const fs = require('fs');

main();

function main(){
    fs.readFile("./sample.txt", {encoding: 'utf-8'}, (err,data) => {
        if(err) throw err;

        const temp = [ ]

        console.log(findPermutations)

    })
}

function findPermutations(symbols){
    let result = [];

    if(symbols.length === 0) return [];
    if(symbbols.length === 1) return [nums];

    for(var i = 0; i < symbols.length; i++){
        const currentSymbol = nums[i];
        const remainingSymbols = symbols.slice(0,1).concat(symbols.slice(i+1));

    }

    return result
}