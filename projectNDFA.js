`use strict`

//=================
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
// ==========================

const port = process.env.PORT || 3000;
app.get('/home', pageone);
app.use(errorHandler);
function pageone(req, res) {
    res.status(200).json({ message: "TEST" })
}
let alphabet = ['a', 'b', 'epsilon'];
let transitionTable = [];
let Lang = [];
let stats = [];

function deterMineStatus() {
    throw new Error(`Rejected`);
}
async function checkinputAlphabet(input) {
    if (!alphabet.includes(input)) {
        throw new Error(`Rejected, alphabet ${input} is not in the alphabet`);
    }
}
function addTransition(state, inputSymbol, nextState) {
    try {
        checkinputAlphabet(inputSymbol);
        if (!stats.includes(state)) {
            stats.push(state);
        }
        if (!stats.includes(nextState)) {
            stats.push(nextState);
        }
        if (!transitionTable[state]) {
            transitionTable[state] = {};
        }
        transitionTable[state][inputSymbol] = nextState;


    } catch (error) {
        console.log(error.message);
    }

}

function getLang(transitionTable) {
    try {
        let deterMineLang = { accept: {} }; // Initialize Lang object with accept and reject properties
        // Iterate over each state in the transition table
        for (let state in transitionTable) {
            for (let inputSymbol in transitionTable[state]) {
                let nextState = transitionTable[state][inputSymbol];
                    if (inputSymbol !== null) {
                        if (nextState === 'end') {
                            deterMineLang['accept'] = {
                                ...deterMineLang['accept'],
                                [state]: inputSymbol
                            };
                        }
                        
                      
                    } else {

                    }



            }

        }
        Lang.push(deterMineLang)

    } catch (error) {
        console.log(error);
    }
}
addTransition('end', 'epsilon', 'end')
addTransition('end', 'a', 'q1')
addTransition('q1', 'b', 'q2')
addTransition('q1', 'a', 'q4')
addTransition('q1', 'a', 'end')
addTransition('q2', 'epsilon', 'q3')
addTransition('q3', 'epsilon', 'end')
stats.sort((a, b) => {
    let numA;
    let numB;
    if (a == 'end') {

        numA = stats.length;
        numB = parseInt(b.slice(1));
    }
    else if (b == 'end') {
        numB = stats.length;
        numA = parseInt(a.slice(1));
    }
    else {
        numA = parseInt(b.slice(1));
        numB = parseInt(b.slice(1));
    }
    return numA - numB;
});
console.log(stats);
// Sort the array based on the numeric part of keys
let keyValueArray = Object.entries(transitionTable);

keyValueArray.sort((a, b) => {
    let numA;
    let numB;
    const stateA = a[0];
    const stateB = b[0];

    if (stateA === 'end') {
        numA = keyValueArray.length; // Place 'end' at the end
        numB = parseInt(stateB.slice(1));
    } else if (stateB === 'end') {
        numA = parseInt(stateA.slice(1));
        numB = keyValueArray.length; // Place 'end' at the end
    } else {
        numA = parseInt(stateA.slice(1));
        numB = parseInt(stateB.slice(1));
    }

    return numA - numB;
});


// Reconstruct the object
let sortedObj = [];
keyValueArray.forEach(([key, value]) => {
    sortedObj[key] = value;
});


function errorHandler(error, req, res) {
    res.status(500).json({
        code: 500,
        message: error.message || error
    })
}
console.log(sortedObj);
getLang(sortedObj);
console.log(Lang);

app
    .listen(port, () => console.log(`Up and Running on port ${port}`))
