let $ = elm => document.querySelector(elm);
let $$ = elm => document.querySelectorAll(elm);

//players 
let player_X_score = 0;
let player_O_score = 0;
let turn = 0;
let winner = false;
let draw = false;
let players = ['', '', '', '', '', '', '', '', ''];
const winningSequences = [
    //row sequence
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //col sequence
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonal sequence
    [0, 4, 8],
    [2, 4, 6]
];

//generate game table
function generateTable(_row, _col) {
    let i = 0;
    let table = "<table>";
    for (let row = 0; row < _row; row++) {
        table += "<tr>";
        for (let col = 0; col < _col; col++) {
            table += `<td data-cell="${i}"></td>`;
            i++;
        }
        table += "</tr>";
    }
    table += "</table>";
    $('.tic-tac-toe').innerHTML = table;
}
generateTable(3, 3);

function currentPlayer() {
    return turn % 2 == 0 ? 'X' : 'O';
}
function gameOver() {
    if (turn > 7) {
        $('.game-over').innerHTML = 'Game Over!';
        setTimeout(() => $('.overlay').style.display = 'block', 1200);
        $('table').removeEventListener('click', tic);
    }
    if (draw) {
        $('.winner').innerHTML = "Draw Match!";
        $$('td').forEach(td => td.classList.add('draw-cell-blink'));
    }
}
function tic(e) {
    //if clicked on empty cell only
    if (e.target.tagName == 'TD' &&
        e.target.innerHTML == '') {
        let currentCell = e.target.dataset.cell;
        if (currentPlayer() == 'X') {
            e.target.innerHTML = 'X';
            players[currentCell] = currentPlayer();
        }
        else {
            e.target.innerHTML = 'O';
            players[currentCell] = currentPlayer();
        }
    }
    else
        return;
    //check if winner / game over
    Winner();
    gameOver();
    turn++;
    if (!winner && !draw) {
        $('.player-turn').innerHTML = `Player '${currentPlayer()}', you are up!`;
    }
    else
        $('.player-turn').style.opacity = 0;

}
function Winner() {
    winningSequences.forEach(match_point => {
        let cell1 = match_point[0];
        let cell2 = match_point[1];
        let cell3 = match_point[2];
        if (players[cell1] == currentPlayer() &&
            players[cell2] == currentPlayer() &&
            players[cell3] == currentPlayer()) {
            if (currentPlayer() == 'X') {
                player_X_score++;
            }
            else {
                player_O_score++;
            }

            $('table').removeEventListener('click', tic);
            $$('td')[cell1].classList.add('cell-blink');
            $$('td')[cell2].classList.add('cell-blink');
            $$('td')[cell3].classList.add('cell-blink');
            winner = true;
        }
        else {
            if (turn > 7) {
                draw = true;
            }
        }
    })
    if (winner) {
        $('.winner').innerHTML = `Player ${currentPlayer()} won the match!`;
        $('.game-over').innerHTML = "Game Over!";
        if (currentPlayer() == 'X')
            $('.player1-score').innerHTML = `${currentPlayer()} score = ${player_X_score}`;
        else
            $('.player2-score').innerHTML = `${currentPlayer()} score = ${player_O_score}`;
        setTimeout(() => $('.overlay').style.display = 'block', 1100);
    }
    if (draw) {
        $('.winner').innerHTML = 'Draw match!';
    }
}
//player's move
$('table').addEventListener('click', tic);

//reset game
function resetGame() {
    players = ['', '', '', '', '', '', '', '', ''];
    turn = 0;
    winner = false;
    draw = false;
    $$('td').forEach(td => {
        td.innerHTML = '';
        td.style.background = null;
    });
}
$('.reset-game').onclick = () => {
    $('.overlay').style.display = 'none';
    $$('td').forEach(td => td.classList.remove('cell-blink'));
    $$('td').forEach(td => td.classList.remove('draw-cell-blink'));
    $('.player-turn').style.opacity = 1;
    $('.player-turn').innerHTML = "Player 'X', you are up!";
    $('table').addEventListener('click', tic);
    resetGame();
}
$('.reset-score').onclick = () => {
    player_O_score = 0;
    player_X_score = 0;
    $('.player1-score').innerHTML = `X score = ${player_X_score}`;
    $('.player2-score').innerHTML = `O score = ${player_O_score}`;
}