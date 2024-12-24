const fs = require('fs');

main();

function main(){
    fs.readFile("./sample.txt", {encoding: 'utf-8'}, (err,data) => {
        if(err) throw err;

        
    })
}