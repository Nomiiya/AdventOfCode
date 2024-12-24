const fs = require('fs');

main();

function main(){
    fs.readFile("./input.txt", {encoding: 'utf-8'}, (err,data) => {
        if(err) throw err;

        data = data.match(/\d{1}/g).map( n => parseInt(n));
        var fileBlocks = new Map();
        

        var fileID = 0;
        var checkSum = 0;

        data.forEach((num, index) => {
            if(index % 2 == 0 ){
                fileBlocks = writeFileBlock(fileBlocks, num, fileID);
                fileID++;
            }
            else{
                fileBlocks = writeFileBlock(fileBlocks, num, ".");
            }
        })

        var p2Blocks = new Map(fileBlocks);
        var p2CheckSum = 0;

        for(var i = 0; i < fileBlocks.size; i++){
            if(fileBlocks.get(i) == '.'){
                var replacementIndex = fileBlocks.size-1;
                while(fileBlocks.get(replacementIndex) == "."){
                    if(replacementIndex == i) { break }
                    replacementIndex--;
                }
                fileBlocks.set(i, fileBlocks.get(replacementIndex))
                fileBlocks.set(replacementIndex, ".");
            }
        }

        var id = 0;
        while(fileBlocks.get(id) != "."){
            checkSum += (id * fileBlocks.get(id));
            id++;
        }
        
        for(var i = p2Blocks.size - 1; i > 0; i--){
            var current = {
                character: " ",
                count: 0,
                index: 0
            }

            if(p2Blocks.get(i) != "."){
                current.character = p2Blocks.get(i);
                current.index = i;
                
                for(var temp = i; p2Blocks.get(temp) == current.character; temp--){
                    current.count++;
                }

                i -= (current.count - 1)

                var results = findReplacementSpace(p2Blocks, current);
                if(results.success){
                    var replacementIndex = results.successIndex;
                    for(var replace = 0; replace != current.count; replace++){
                        p2Blocks.set(results.successIndex, current.character);
                        results.successIndex++;
                        p2Blocks.set(current.index, ".")
                        current.index--;
                    }
                }
            }
        }

        p2Blocks.forEach((item, index) => {
            if( item != "."){
                p2CheckSum += (item * index);
            }
        })

        console.log("Puzzle 1 answer: " + checkSum);
        
        console.log("Puzzle 2 answer: " + p2CheckSum);

    })
}

function findReplacementSpace(blocks, current){
    var success = false;
    var successIndex = 0;
    var index = 0;

    for(index; index != current.index; index++){
        var spaceCount = 0;
        if(blocks.get(index) == "."){
            var temp = index

            for(temp; blocks.get(temp) == "."; temp++){
                spaceCount++;
            }

            if(spaceCount > current.count || spaceCount == current.count){
                success = true;
                successIndex = index;
                return { success, successIndex }
            }
            index = temp;
        }
    }

    return { success, successIndex }
}

function writeFileBlock(fileBlocks, amt, character){
    for(var i = 0; i < amt ; i++){
        fileBlocks.set(fileBlocks.size, character);
    }

    return fileBlocks;
}