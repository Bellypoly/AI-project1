// move: {from: a1, to: a2}
// parentDepth: 0 - root - Max, 1 - Min, 2 - Max, 3 - Min
function generateChildren (state,parentDepth) {
    let result = [];        // array of possible moves
    let pieces = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (parentDepth % 2 === 0) {
                if (state[i][j] === ourColor) pieces.push([i,j]);
            } else {
                if (state[i][j] === opponentColor) pieces.push([i,j]);
            }
        }
    }
    if (pieces.length > 0) {
        pieces.forEach(e=>{
            let from = symbols[e[1]]+e[0].toString();
            // check column
            for (let i = e[0]+1; i < 8; i++) {
                if (state[i][e[1]] === 'blank') result.push({from:from, to: symbols[e[1]]+i.toString()});
                else break;
            }
            for (let i = e[0]-1; i>=0; i = i - 1) {
                if (state[i][e[1]] === 'blank') result.push({from:from, to: symbols[e[1]]+i.toString()});
                else break;
            }
            // check row
            for (let i = e[1]+1; i < 8; i++) {
                if (state[e[0]][i] === 'blank') result.push({from:from,to: symbols[i]+e[0].toString()});
                else break;
            }
            for (let i = e[1]-1; i>=0; i = i - 1) {
                if (state[e[0]][i] === 'blank') result.push({from:from,to: symbols[i]+e[0].toString()});
                else break;
            }
        });
    }
    return result;
}