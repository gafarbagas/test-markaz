const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let points = [];

rl.question('Masukkan jumlah pemain: ', (inputPlayer) => {
    const playerCount = parseInt(inputPlayer);

    if (isNaN(playerCount) || playerCount <= 0) {
        console.log('Jumlah player harus berupa angka positif.');
        rl.close();
    } else {
        rl.question(`Masukkan jumlah dadu: `, (inputDice) => {
            const diceCount = parseInt(inputDice);

            if (isNaN(diceCount) || diceCount <= 0) {
                console.log('Jumlah dadu harus berupa angka positif.');
                rl.close();
            } else {
                init(playerCount, diceCount);
                rl.close();
            }
        });
    }
});

const init = (playerCount, diceCount) => {
    console.log(`\nPemain: ${playerCount}, Dadu: ${diceCount}`);
    let players = [];
    for (let i = 0; i < playerCount; i++) {
        players.push(Array(diceCount))
        points.push(0);
    }
    let turn = 1;
    while (!checkPlayers(players)) {
        console.log('==========');
        console.log(`Giliran ${turn} lempar dadu`);
        play(players);
        showDices(players);
        console.log('Setelah evaluasi');
        eval(players);
        showDices(players);
        turn++;
    }

    showWinner(players);
};

const checkPlayers = (players) => {
    const activePlayers = players.filter(player => player.length > 0);
    return activePlayers.length === 1;
};

const shuffleDice = (diceCount) => {
    const dice = [];
    for (let i = 0; i < diceCount; i++) {
        dice.push(Math.floor(Math.random() * 6) + 1);
    }
    return dice;
};

const play = (players) => {
    for (let i = 0; i < players.length; i++) {
        const dices = shuffleDice(players[i].length);
        players[i] = dices;
    }
};

const showDices = (players) => {
    for (let i = 0; i < players.length; i++) {
        console.log(`Pemain #${i + 1} (${points[i]}): ${players[i].length > 0 ?  players[i] : '_ (Berhenti bermain karena tidak memiliki dadu)'}`);
    }
};

const eval = (players) => moveDice(removeDice(players));

const removeDice = (players) => {
    for (let i = 0; i < players.length; i++) {
        if (players[i].length === 0)
            continue;

        points[i] += players[i].filter(number => number === 6).length
        players[i] = players[i].filter(number => number !== 6);
    }
    return players;
};

const moveDice = (players) => {
    for (let i = 0; i < players.length; i++) {
        if (players[i].length === 0)
            continue;

        const oneCount = players[i].filter(number => number === 1).length;
        players[i] = players[i].filter(number => number !== 1);
        let next = (i + 1) % players.length;
        if (oneCount > 0) {
            while (next !== i) {
                if (players[next].length !== 0) {
                    players[next] = players[next].concat(Array(oneCount).fill(0));
                    break;
                } else {
                    next = (next + 1) % players.length;
                }
            }
        }
    }

    for (let i = 0; i < players.length; i++) {
        players[i] = players[i].map(number => number === 0 ? 1 : number);
    }
    return players;
};

const showWinner = (players) => {
    const lastPlayer = players.findIndex(player => player.length > 0) + 1;
    const highestPoints = Math.max(...points);
    const highestPlayer = points.findIndex(point => point === highestPoints) + 1;

    console.log(`==========`);
    console.log(`Game berakhir karena hanya #${lastPlayer} yang memiliki dadu`);
    console.log(`Game dimenangkan oleh pemain #${highestPlayer} karena memiliki poin lebih banyak dari pemain lainnya.`);
};