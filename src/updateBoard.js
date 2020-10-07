// move : {from: 'a1', to: 'a2'}
function updateBoard(state,move) {
    let newState = state.map(e=>e.map(e_=>e_));
    let str1 = move.from;
    let str2 = move.to;
    let col1 = symbols.findIndex(e=>e===str1.substring(0,1));
    let col2 = symbols.findIndex(e=>e===str2.substring(0,1));
    let row1 = +str1.substring(1);
    let row2 = +str2.substring(1);
    let checkError = col1!==-1 && col2!==-1 && row1>=0 && row1 <=7 && row2>=0 && row2<=7;
    if (!checkError) return 'error in input!';
    else {
        if (newState[row2][col2] !== 'blank') return 'cannot move to occupied square!';
        else {
            if (newState[row1][col1] === 'blank') return 'no piece found at starting square!';
            else {
                newState[row2][col2] = newState[row1][col1];
                newState[row1][col1] = 'blank';
                let result = checkSqueeze(newState,newState[row2][col2],row2,col2);
                return result;
            }
        }
    }
}