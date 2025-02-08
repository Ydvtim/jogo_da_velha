const currentPlayer = document.querySelector(".currentPlayer"); //evento dos nomes dos jogadores
const resetButton = document.getElementById("resetButton"); // quando clicar no botão de reiniciar o jogo vai reiniciar
const reloadButton = document.getElementById("reloadButton"); // quando clicar no botão de reiniciar a página vai reiniciar a pagina
let selected;
let jogador1 = prompt("Digite o nome do jogador X:") || "Jogador X"; // coletando o nome dos jogadores
let jogador2 = prompt("Digite o nome do jogador O:") || "Jogador O";

let playerX = "X"; 
let playerO = "O";

let player = playerX; // Começa com X
// vitorias possiveis
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
    selected = Array(9).fill(null); // para começar vazias
    player = playerX; // Sempre inicia com X
    currentPlayer.innerHTML = `SUA VEZ: ${player === "X" ? jogador1 : jogador2}`;

    document.querySelectorAll(".jogo button").forEach((item, index) => {
        item.innerHTML = "";
        item.removeAttribute("disabled");
        item.setAttribute("data-i", index); // vai garanter que os índices estão corretos
        item.addEventListener("click", newMove);
    });
}

function newMove(e) {
    const index = Number(e.target.getAttribute("data-i"));

    if (!selected[index]) {
        selected[index] = player;
        e.target.innerHTML = player;
        e.target.setAttribute("disabled", true); // evita clique repetido ex: clicar 2 vezes e ele repetir

        // Verifica se o jogador atual venceu
        if (check(player)) {
            setTimeout(() => {
                let venc= player === "X" ? jogador1 : jogador2;
                alert(`O JOGADOR(A) ${venc} VENCEU!🏆✨`);
                init();
            }, 100);
            return;
        }

        // Se não houve vitória, verifica empate
        if (!selected.includes(null)) {
            setTimeout(() => {
                alert("EMPATE!🫤");
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

resetButton.addEventListener("click", init); // Botão resetar jogo
reloadButton.addEventListener("click", () => location.reload()); // botãao resetar página
init();


