const fs = require('fs');

main();

function main(){
    fs.readFile("./sample.txt", {encoding: "utf-8"}, (err, data) =>{
        if(err) throw err;

        data = data.split("\r\n");
        for(var i = 0; i < data.length; i++){
            data[i] = data[i].match(/[a-zA-z]{1}/g);
        }
        
        data.forEach((line, rowIndex) => {
            var valid = [];

            line.forEach((letter, colIndex) => {
                if(letter == "X")checkSurroundingIndex(data, {rowIndex, colIndex});
            })
        })
    })
}

function checkSurroundingIndex(data, index){
    var validIndex = [];

   // data[index.rowIndex].forEach((letter,index) =>{
    // LR
    if(data[index.rowIndex][index.colIndex - 1] == "M" && index.colIndex != 0){
        console.log("M Left" + data[index.rowIndex][index.colIndex - 1] )
    }
    if(data[index.rowIndex][index.colIndex + 1] == "M"){
        console.log("M Right")
    }
    // LT RT
    // TD
    // LD RD
 //   })
 
}

function validate(){

}