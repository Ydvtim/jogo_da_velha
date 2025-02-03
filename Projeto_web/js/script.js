const currentPlayer = document.querySelector(".currentPlayer");

let selected;
let playerX = prompt("Digite o nome do jogador X:");
let playerO = prompt("Digite o nome do jogador O:");
let currentTurn = "X";

let positions = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7],
];

function init() {
    selected = [];
    currentPlayer.innerHTML = `SUA VEZ ${playerX}`;

    document.querySelectorAll(".jogo button").forEach((item) => {
        item.innerHTML = "";
        item.addEventListener("click", newMove);
    });
}
init();

function newMove(e) {
    const index = e.target.getAttribute("data-i");
    if (!selected.includes(index) && e.target.innerHTML === "") {
        selected.push(index);
        e.target.innerHTML = currentTurn;
        currentTurn = currentTurn === "X" ? "O" : "X";
        updateCurrentPlayer();
    }
}

function updateCurrentPlayer() {
    currentPlayer.innerHTML = currentTurn === "X" ? `SUA VEZ ${playerX}` : `SUA VEZ ${playerO}`;
}
