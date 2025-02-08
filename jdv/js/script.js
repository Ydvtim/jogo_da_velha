const currentPlayer = document.querySelector(".currentPlayer");

let selected;
let jogador1 = prompt("Digite o nome do jogador X:") || "Jogador X";
let jogador2 = prompt("Digite o nome do jogador O:") || "Jogador O";

let playerX = "X";
let playerO = "O";

let player = playerX; // Começa com X

let positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function init() {
    selected = Array(9).fill(null); // para garantir que vai começar vazia
    player = playerX; // Sempre inicia com X
    currentPlayer.innerHTML = `SUA VEZ: ${player === "X" ? jogador1 : jogador2}`;

    document.querySelectorAll(".jogo button").forEach((item, index) => {
        item.innerHTML = "";
        item.removeAttribute("disabled");
        item.setAttribute("data-i", index); // para garantir que os índice estão corretos.
        item.addEventListener("click", newMove);
    });
}

function newMove(e) {
    const index = Number(e.target.getAttribute("data-i"));

    if (!selected[index]) {
        selected[index] = player;
        e.target.innerHTML = player;
        e.target.setAttribute("disabled", true); // Evita clique repetido, ex: clicar 2 vezes e repitir.

        // Verifica se o jogador atual venceu
        if (check(player)) {
            setTimeout(() => {
                let winnerName = player === "X" ? jogador1 : jogador2;
                alert(`O JOGADOR ${winnerName} VENCEU!`);
                init();
            }, 100);
            return;
        }

        // se não houve vitória,  e verifica empate.
        if (!selected.includes(null)) {
            setTimeout(() => {
                alert("EMPATE!");
                init();
            }, 100);
            return;
        }

        // Troca de jogador
        player = player === "X" ? "O" : "X";
        currentPlayer.innerHTML = `SUA VEZ: ${player === "X" ? jogador1 : jogador2}`;
    }
}

function check(playerToCheck) {
    return positions.some((pos) => pos.every((index) => selected[index] === playerToCheck));
}

init();
