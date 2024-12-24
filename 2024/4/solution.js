const fs = require('fs');

main();

function main(){
    fs.readFile("./input.txt", {encoding: "utf-8"}, (err, data) => {
        if(err) throw err;
       data = data.split("\n");

        var parsedData = [];
        var total = 0;
        var xtotal = 0;
        
        data.forEach(line => {
            parsedData.push(line.match(/[XMAS]/g));
        })

        parsedData.forEach((line, rowIndex) => {
            line.forEach((letter, colIndex) => {
                if(letter == "X"){
                    total += checkSurrounding(parsedData, {rowIndex, colIndex});
                }
                if(letter == "A" && checkXMas(parsedData, {rowIndex, colIndex})){
                    xtotal++;
                }
            })
        })

        console.log("Puzzle 1 Answer: " + total);
        console.log("Puzzle 2 Answer: " + xtotal);
    })
}

var directions = {
    TL: "TL",
    T: "T",
    TR: "TR",
    L: "L",
    R: "R",
    BL: "BL",
    B: "B",
    BR: "BR"
};

function checkSurrounding(data, currentCoord){
    var total = 0;

    var top = (currentCoord.rowIndex == 0);
    var left = (currentCoord.colIndex == 0);
    var right = (currentCoord.colIndex == data[currentCoord.rowIndex].length - 1);
    var bot = (currentCoord.rowIndex == data.length - 1);

    // top left
    if(!top && !left){
            if(checkAcceptance(data,
                {
                    rowIndex: (currentCoord.rowIndex - 1),
                    colIndex: (currentCoord.colIndex -1)
                },
                directions.TL
            )){
                total++;
            }
    }    

    // top
    if(!top){
        if(checkAcceptance(data,
            {
                rowIndex: (currentCoord.rowIndex - 1),
                colIndex: (currentCoord.colIndex )
            },
            directions.T
        )){
            total++;
        }
    }

    // top right
    if(!top && !right){
        if(checkAcceptance(data,
            {
                rowIndex: (currentCoord.rowIndex - 1),
                colIndex: (currentCoord.colIndex + 1)
            },
            directions.TR
        )){
            total++;
        }
    }

    // left
    if(!left){
        if(checkAcceptance(data,
            {
                rowIndex: (currentCoord.rowIndex),
                colIndex: (currentCoord.colIndex -1)
            },
            directions.L
        )){
            total++;
        }
    }

    // right
    if(!right){
        if(checkAcceptance(data, {
                rowIndex: (currentCoord.rowIndex),
                colIndex: (currentCoord.colIndex + 1)
            }, directions.R)){
                total++;
            }
            
    }

    // bot left
    if(!bot && !left){
        if(checkAcceptance(data,
            {
                rowIndex: (currentCoord.rowIndex + 1),
                colIndex: (currentCoord.colIndex - 1)
            }, directions.BL
        )){
            
            total++;
        }
    }

    // bot right
    if(!bot && !right){
        if(checkAcceptance(data,
            {
                rowIndex: (currentCoord.rowIndex + 1),
                colIndex: (currentCoord.colIndex + 1)
            }, directions.BR
        )){
            
            total++;
        }
    }

    if(!bot){
        if(checkAcceptance(data,
            {
                rowIndex: (currentCoord.rowIndex + 1),
                colIndex: (currentCoord.colIndex)
            }, directions.B
        )){
            
            total++;
        }
    }
    

    return total;
}

function checkAcceptance(data, currentCoord, direction){
    var accepted = true;
    var letterOrder = ["M", "A", "S"];

    if(direction == directions.TL){
        for(var i = 0; i < 3; i++){
            if(
                (currentCoord.rowIndex - i >= 0)&&
                (currentCoord.colIndex - i >= 0)
            ){
                if(data[currentCoord.rowIndex - i][currentCoord.colIndex - i] != letterOrder[0]){
                    accepted = false;
                    break;
                }
                letterOrder.shift();
            }else{
                if(letterOrder.length > 0){
                    accepted = false;
                    break;
                }
            }
        }
    }

    if(direction == directions.T){
        for(var i = 0; i < 3; i++){
            if(currentCoord.rowIndex - i >= 0){
                
                if(data[currentCoord.rowIndex - i][currentCoord.colIndex] != letterOrder[0]){
                    accepted = false;
                    break;
                }
                letterOrder.shift();
            }
            else{
                if(letterOrder.length > 0){
                    accepted = false;
                    break;
                }
            }
        }
    }

    if(direction == directions.TR){
        for(var i = 0; i < 3; i++){
            if((currentCoord.rowIndex - i >= 0) &&
                (currentCoord.colIndex + i < data[currentCoord.rowIndex].length))
            {
                if(data[currentCoord.rowIndex - i][currentCoord.colIndex + i] != letterOrder[0]){
                    accepted = false;
                    break;
                }
                letterOrder.shift();
            }
            else{
                if(letterOrder.length > 0){
                    accepted = false;
                    break;
                }
            }
        }
    }

    if(direction == directions.L){
        for(var i = 0; i < 3; i++){
            if(currentCoord.colIndex - i >= 0 ){
                if(data[currentCoord.rowIndex][currentCoord.colIndex - i] != letterOrder[0]){
                    accepted = false;
                    break;
                }
                letterOrder.shift();
            }
            else{
                if(letterOrder.length > 0){
                    accepted = false;
                    break;
                }
            }
        }
    }

    if(direction == directions.R){
        for(var i = 0; i < 3; i++){
            if(currentCoord.colIndex + i < data[currentCoord.rowIndex].length){
                if(data[currentCoord.rowIndex][currentCoord.colIndex + i] != letterOrder[0]) {
                    accepted = false;
                    break;
                }
                letterOrder.shift();
            } 
            else{
                if(letterOrder.length > 0){
                    accepted = false;
                    break;
                }
            }
        }
    }

    if(direction == directions.BL){
        for(var i = 0; i < 3; i++){
            if((currentCoord.rowIndex + i < data.length) && (currentCoord.colIndex - i >= 0)){
                if(data[currentCoord.rowIndex + i][currentCoord.colIndex - i] != letterOrder[0]){
                    accepted = false;
                    break;
                }
                letterOrder.shift();
            }
            else{
                if(letterOrder.length > 0){
                    accepted = false;
                    break;
                }
            }
        }
    }

    if(direction == directions.BR){
        for(var i = 0; i < 3; i++){
            if((currentCoord.rowIndex + i < data.length ) && (currentCoord.colIndex + i < data[currentCoord.rowIndex].length)){
                if(data[currentCoord.rowIndex + i][currentCoord.colIndex + i] != letterOrder[0]){
                    accepted = false;
                    break;
                }
                letterOrder.shift();
            }
            else{
                if(letterOrder.length > 0){
                    accepted = false;
                    break;
                }
            }
        }
    }

    if(direction == directions.B){
        for(var i = 0; i < 3; i++){
            if((currentCoord.rowIndex + i < data.length)){
                if(data[currentCoord.rowIndex + i][currentCoord.colIndex] != letterOrder[0]){
                    accepted = false;
                    break;
                }
                letterOrder.shift();
            }
            else{
                if(letterOrder.length > 0){
                    accepted = false;
                    break;
                }
            }
        }
    }


    return accepted;
}


function checkXMas(data, currentCoord){

    if(
        (currentCoord.rowIndex - 1 < 0) ||
        (currentCoord.rowIndex + 1 > data.length - 1) ||
        (currentCoord.colIndex - 1 < 0) ||
        (currentCoord.colIndex + 1 > data[currentCoord.rowIndex].length - 1)
    ){
        return false;
    }
    else
    {var tlbrDiag = new Map();
    tlbrDiag.set("A", 1);

    if(tlbrDiag.has(data[currentCoord.rowIndex - 1][currentCoord.colIndex - 1])){
        return false;
    }
    else{
        tlbrDiag.set(data[currentCoord.rowIndex - 1][currentCoord.colIndex - 1], 1)
    }
    
    if(tlbrDiag.has(data[currentCoord.rowIndex + 1][currentCoord.colIndex + 1])){
        return false;
    }
    else{
        tlbrDiag.set(data[currentCoord.rowIndex + 1][currentCoord.colIndex + 1], 1)
    }
        

    var bltrDiag = new Map();
    bltrDiag.set("A", 1)

    if(bltrDiag.has(data[currentCoord.rowIndex + 1][currentCoord.colIndex - 1])) return false;
    else bltrDiag.set(data[currentCoord.rowIndex + 1][currentCoord.colIndex - 1], 1)

    if(bltrDiag.has(data[currentCoord.rowIndex - 1][currentCoord.colIndex + 1])) return false;
    else bltrDiag.set(data[currentCoord.rowIndex - 1][currentCoord.colIndex + 1], 1)

    return (checkXValid(tlbrDiag) && checkXValid(bltrDiag));}
}

function checkXValid(data){
    return (
        data.get("M") == 1 &&
        data.get("A") == 1 &&
        data.get("S") == 1
    )
}