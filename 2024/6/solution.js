const fs = require('fs');

var direction = new Map();
direction.set("^", [0, -1]);
direction.set(">", [1, 0]);
direction.set("V", [0, 1]);
direction.set("<", [-1, 0]);

var rotateDirection = new Map();
rotateDirection.set("^", ">");
rotateDirection.set(">", "V");
rotateDirection.set("V", "<");
rotateDirection.set("<", "^");


main();

function main(){
    fs.readFile("./sample.txt", {encoding: 'utf-8'}, (err,data) => {
        if(err) throw err;
        data = data.split("\n")

        var labMap = [];
        var guard = {};
        var totalSpots = 0;

        data.forEach(line => {
            labMap.push(line.match(/[.#^]/g))
        })
        
        labMap.forEach((line, posY) => {
            if(line.find(n => /[\^>V<]/g.test(n))){
                var posX = line.findIndex(n => /[\^>V<]/g.test(n));
                guard = {
                    posX,
                    posY,
                    direction: line[posX]
                };
                console.log(guard)
            }
        })

        totalSpots += moveGuard(labMap, guard);

        //console.log(guard)
        //console.log("spaced moved: " + totalSpots)
    })
}

function moveGuard(labMap, guard){

    var movedSpace = 0;
    var count = 0;

    while(
        ((guard.posX > 0 || guard.posX < labMap[0].length ) &&
        (guard.posY > 0 || guard.posY < labMap.length))
    ){
        console.log("Movement: " + direction.get(guard.direction))
        
        var nextCoord = [guard.posY + direction.get(guard.direction)[1], guard.posX + direction.get(guard.direction)[0]];

        // if()
        // {
            console.log("NEXTYC: "+ nextCoord)
            if(labMap[nextCoord[0]][nextCoord[1]] != '#'){
                movedSpace++;
                labMap[guard.posY][guard.posX] = ".";
                labMap[nextCoord[0]][nextCoord[1]] = guard.direction;
                guard.posX = nextCoord[1]
                guard.posY = nextCoord[0]
                console.log("MOVED")
                console.log(guard)
                console.log("=------------------")
                labMap.forEach(line => console.log(line.join()))
            }
            else{
                guard.direction = rotateDirection.get(guard.direction);
            }
        // }

    }

    return movedSpace;
}

// function moveOneWay(labMap, position, direction){
    

//     return {movedSpace, position}
// }