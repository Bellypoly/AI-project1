function Minimax (state,alpha,beta,currentDepth) {
    if (currentDepth === plyDepth) {
        return evaluateHeuristics(state);
    } else {
        let possibleMoves = generateChildren(state,currentDepth);
        if (possibleMoves.length === 0) {
            return evaluateHeuristics(state);
        } else {
            if (currentDepth % 2 === 0) {       // Max
                let bestVal = - Infinity;
                for (let i = 0; i < possibleMoves.length; i++) {
                    let child = updateBoard(state,possibleMoves[i]);
                    let val = Minimax(child,alpha,beta,currentDepth+1);
                    bestVal = (val > bestVal) ? val : bestVal;
                    alpha = (bestVal > alpha) ? bestVal : alpha;
                    if (beta <= alpha) break;
                }
                return bestVal;
            } else {        // Min
                let bestVal = + Infinity;
                for (let i = 0; i < possibleMoves.length; i++) {
                    let child =updateBoard(state,possibleMoves[i]);
                    let val = Minimax(child,alpha,beta,currentDepth+1);
                    bestVal = (val < bestVal) ? val : bestVal;
                    beta = (bestVal < beta) ? bestVal : beta;
                    if (beta <= alpha) break;
                }
                return bestVal;
            }
        }
    }


}