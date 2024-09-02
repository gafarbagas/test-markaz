const readline = require('readline');

// function createTriangle(x) {
//     for (let i = 1; i <= x; i++) {
//         let spaces = x - i;
//         let hashes = i;
//         let row = ' '.repeat(spaces) + '#'.repeat(hashes);
//         console.log(row);
//     }
// }

function createTriangle(x) {
    for (let i = 1; i <= x; i++) {
        let spaces = '';
        for (let j = 0; j < x - i; j++) {
            spaces += ' ';
        }

        let hashes = '';
        for (let k = 0; k < i; k++) {
            hashes += '#';
        }

        console.log(spaces + hashes);
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the size of the triangle: ', (input) => {
    const size = parseInt(input);
    if (!isNaN(size) && size > 0 && size <= 100) {
        createTriangle(size);
    } else {
        console.log('Please enter a valid number between 1 and 100.');
    }
    rl.close();
});
