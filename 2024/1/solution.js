
const fs = require('fs');

main();

function main (){
    fs.readFile('./input.txt', {encoding: 'utf-8'},(err, data) => {
        if(err) throw err;
    
        var col1 = [];
        var col2 = [];
        data = data.split('\n');
    
        data.forEach(line => {
            line = line.split('   ');
            
            if( col1.length == 0){
                col1.push(parseInt(line[0]))
            }
            else{
                col1 = inputSort(col1, parseInt(line[0]));
             }
            
            if( col2.length == 0){
                col2.push(parseInt(line[1])) 
            }
            else{
                col2 = inputSort(col2, parseInt(line[1]));
             }
            
        })
        
        //Puzzle 1
        var sum = 0;
        for(var i = 0; i < col1.length; i++){
            sum += Math.abs(col1[i] - col2[i])
            
        }
    
        console.log("Puzzle 1 Answer: " + sum);
    
        //Puzzle 2 - using binary search since the arrays are sorted

        var simScore = 0;

        col1.forEach(num => {
            var targetIndex = simBinarySearch(col2, num, 0, col2.length);
            var count = findCount(col2, targetIndex, num);
            simScore += (num * count);
        })

        console.log("Puzzle 2 Answer: " + simScore);
    })    
}

function findCount(arr, index, target){
    var count = 0;
    var i = index-1;
    var k = index+1;

    if(arr[index] == target) count++;

    while( arr[i] == target){
        count++;
        i--;
    }
    
    while( arr[k] == target){
        count++;
        k++;
    }
    
    return count;
}

function simBinarySearch(arr, target, lowIndex, highIndex ){
    if( lowIndex > highIndex || arr == null || target == null) { return false;}
    
    var midIndex = Math.floor((lowIndex + highIndex)/2);

    if( target == arr[midIndex]) { return midIndex; }
    else if( target > arr[midIndex]){ return simBinarySearch(arr, target, midIndex + 1, highIndex);}
    else { return simBinarySearch(arr, target, lowIndex, midIndex - 1);}
}

function inputSort(colArray, input){
    try{
        for(let i = 0; i <= colArray.length; i++){
            if(colArray[i] > input){
                if(i == 0) { 
                    colArray.unshift(input);
                    return colArray;
                }
                
                colArray.splice(i,0,input);
                return colArray
            }
        }
        colArray.push(input);
        return colArray;
    }
    catch (err) {throw err;}
}