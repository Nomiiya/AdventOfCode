const fs = require('fs');

main();

function main(){
    fs.readFile('./input.txt', {encoding: 'utf-8'}, (err,data) => {
        if(err) throw err;

        data = data.split('\n')
    
        var p1Count = 0;
        var p2Count = 0;

        data.forEach(line => {
            const arr = line.split(' ');
            var result = checkSafetyTest(arr);
            var toleranceFailure = true;

            if(!result.success){
                if(result.failIndex == 1){
                    var first = [...arr];
                    first.splice(0,1);
                    if(checkSafetyTest(first).success){
                        p2Count++;
                        toleranceFailure = false;
                    }
                }

                if(toleranceFailure){
                    var left = [...arr];
                    left.splice(result.failIndex + 1, 1);
                    if(checkSafetyTest(left).success){
                        p2Count++;
                        toleranceFailure = false;
                    }
                    else{
                        var right = [...arr];
                        right.splice(result.failIndex,1);
                        if(checkSafetyTest(right).success){
                            p2Count++;
                            toleranceFailure = false;
                        }
                    }
                }
            }else{ p1Count++;}
        })

        console.log("Puzzle 1 Answer: " + p1Count);
        console.log("Puzzle 2 Answer: " + (p1Count + p2Count));
    })
}

function checkSafetyTest(arr){
    var success = true;
    var failIndex = 0;

    if(parseInt(arr[0]) > parseInt(arr[1])){
        for(var i = 0; i < arr.length; i++){
            var diff = Math.abs(parseInt(arr[i]) - parseInt(arr[i+1]));
            if( diff < 1 || diff > 3 || parseInt(arr[i]) < parseInt(arr[i+1])) { 
                success = false;
                failIndex = i;
                return {success, failIndex};
            }
        }
    }
    else{
        for(var i = 0; i < arr.length; i++){
            var diff = Math.abs(parseInt(arr[i]) - parseInt(arr[i+1]));
            if( diff < 1 || diff > 3 || parseInt(arr[i]) > parseInt(arr[i+1])) { 
                success = false;
                failIndex = i;
                return {success, failIndex};
            }
        }
    }

    return {success, failIndex};
}