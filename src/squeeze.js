function checkSqueeze(state,color,row,col) {
    let result = state.map(e=>e.map(e_=>e_));
    let eliminate = [];
    // check row
    let squeeze = [];
    let start = -1;
    for (let i = 0; i <= col; i++) {        // get left part of the (row,col)
        if (state[row][i] !== 'blank') {squeeze.push(state[row][i]); start = start !== -1 ? start : i;}
        else {squeeze.length = 0; start = -1;}
    }
    for (let i = col+1; i <8; i++) {        // get the right part
        if (state[row][i] !== 'blank') squeeze.push(state[row][i]);
        else break;
    }
    if (squeeze.length > 2) {
        let changeArrRow = [];  // store index of color change in squeeze
        for (let i = 0; i < squeeze.length-1; i++) {
            if (squeeze[i] !== squeeze[i+1]) changeArrRow.push(i);
        }
        if (changeArrRow.length > 1) {
            for (let i = 0; i < changeArrRow.length-1; i++) {
                if (squeeze[i] === color) {     // outside => remove inside
                    for (let j = start+squeeze[i]+1; j <= start+squeeze[i+1]; j++) {
                        if (eliminate.findIndex(e=>e[1]===j)!==-1) eliminate.push([row,j]);
                    }
                } else {        // inside => remove two pieces outside
                    if (eliminate.findIndex(e=>e[1]===start+squeeze[i])!==-1) eliminate.push([row,start+squeeze[i]]);
                    if (eliminate.findIndex(e=>e[1]===start+squeeze[i+1]+1)!==-1) eliminate.push([row,start+squeeze[i+1]+1]);
                }
            }
        }
    }
    // check column
    squeeze.length = 0;
    start = -1;
    for (let i = 0; i <= row; i++) {        // get below part of the (row,col)
        if (state[i][col] !== 'blank') {squeeze.push(state[i][col]); start = start !== -1 ? start : i;}
        else {squeeze.length = 0; start = -1;}
    }
    for (let i = row+1; i <8; i++) {        // get the above part
        if (state[i][col] !== 'blank') squeeze.push(state[i][col]);
        else break;
    }
    if (squeeze.length > 2) {
        let changeArrCol = [];  // store index of color change in squeeze
        for (let i = 0; i < squeeze.length-1; i++) {
            if (squeeze[i] !== squeeze[i+1]) changeArrCol.push(i);
        }
        if (changeArrCol.length > 1) {
            for (let i = 0; i < changeArrCol.length-1; i++) {
                if (squeeze[i] === color) {     // outside => remove inside
                    for (let j = start+squeeze[i]+1; j <= start+squeeze[i+1]; j++) {
                        if (eliminate.findIndex(e=>e[0]===j)!==-1) eliminate.push([j,col]);
                    }
                } else {        // inside => remove two pieces outside
                    if (eliminate.findIndex(e=>e[0]===start+squeeze[i])!==-1) eliminate.push([start+squeeze[i],col]);
                    if (eliminate.findIndex(e=>e[0]===start+squeeze[i+1]+1)!==-1) eliminate.push([start+squeeze[i+1]+1,col]);
                }
            }
        }
    }
    if (eliminate.length > 0) {
        eliminate.forEach(e=>{
            result[e[0]][e[1]] = 'blank';
        });
    }
    return result;
}