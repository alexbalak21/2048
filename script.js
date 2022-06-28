let gameSpace = document.getElementById("game");
let table = document.createElement("table");

// CREATING GAME GRID
let gameGrid = new Array(4);
let row = new Array(4);
for (let i = 0; i < 4; i++) {
	row[i] = document.createElement("tr");
	gameGrid[i] = new Array(4);
	for (let j = 0; j < 4; j++) {
		gameGrid[i][j] = document.createElement("td");
		row[i].appendChild(gameGrid[i][j]);
	}
	table.appendChild(row[i]);
}
gameSpace.appendChild(table);

//CREATING LOGIC GRID
let blocks = new Array(4);
for (let i = 0; i < 4; i++) {
	blocks[i] = new Array(4);
	for (let j = 0; j < 4; j++) {
		blocks[i][j] = null;
	}
}

// CREATING PLAY BLOCKS

function refrechGrid() {
	for (let i = 0; i < 4; i++) {
		for (let j = 0; j < 4; j++) {
			if (blocks[i][j] == null) {
				gameGrid[i][j].innerText = "";
				gameGrid[i][j].style.backgroundColor = "#abaaab";
			} else {
				gameGrid[i][j].innerText = blocks[i][j];
				gameGrid[i][j].style.backgroundColor = "dodgerblue";
			}
		}
	}
}

function input() {
	document.addEventListener("keydown", (event) => {
		if (event.key === "ArrowLeft") left();
		if (event.key === "ArrowRight") right();
		if (event.key === "ArrowUp") up();
		if (event.key === "ArrowDown") down();
	});
}

refrechGrid();
input();
function right() {
	for (let l = 0; l < 4; l++) {
		//COMBINE RIGHT
		for (let c = 3; c >= 1; c--) {
			if (blocks[l][c] != null && blocks[l][c] == blocks[l][c - 1]) {
				blocks[l][c] *= 2;
				blocks[l][c - 1] = null;
			}
		}
		//SLIDING RIGHT
		for (let k = 0; k < 4; k++) {
			for (let c = 3; c >= 1; c--) {
				if (blocks[l][c] == null && blocks[l][c - 1] != null) {
					blocks[l][c] = blocks[l][c - 1];
					blocks[l][c - 1] = null;
				}
			}
		}
	}
	refrechGrid();
}

function left() {
	//COMBINE LEFT
	for (let l = 0; l < 4; l++) {
		for (let c = 0; c <= 2; c++) {
			if (blocks[l][c] != null && blocks[l][c] == blocks[l][c + 1]) {
				blocks[l][c] *= 2;
				blocks[l][c + 1] = null;
			}
		}
		//SLIDING LEFT
		for (let k = 0; k < 4; k++) {
			for (let c = 0; c <= 2; c++) {
				if (blocks[l][c] == null && blocks[l][c + 1] != null) {
					blocks[l][c] = blocks[l][c + 1];
					blocks[l][c + 1] = null;
				}
			}
		}
	}
	refrechGrid();
}

function up() {
	//COMBINE UP
	for (let c = 0; c < 4; c++) {
		for (let l = 0; l <= 2; l++) {
			if (blocks[l][c] != null && blocks[l][c] == blocks[l + 1][c]) {
				blocks[l][c] *= 2;
				blocks[l + 1][c] = null;
			}
		}
		//SLIDING UP
		for (let k = 0; k < 4; k++) {
			for (let l = 0; l <= 2; l++) {
				if (blocks[l][c] == null && blocks[l + 1][c] != null) {
					blocks[l][c] = blocks[l + 1][c];
					blocks[l + 1][c] = null;
				}
			}
		}
	}
	refrechGrid();
}

function down() {
	//COMBINE DOWN
	for (let c = 0; c < 4; c++) {
		for (let l = 3; l >= 1; l--) {
			if (blocks[l][c] != null && blocks[l][c] == blocks[l - 1][c]) {
				blocks[l][c] *= 2;
				blocks[l - 1][c] = null;
			}
		}
		//SLINDING DOWN
		for (let k = 0; k < 4; k++) {
			for (let l = 3; l >= 1; l--) {
				if (blocks[l][c] == null && blocks[l - 1][c] != null) {
					blocks[l][c] = blocks[l - 1][c];
					blocks[l - 1][c] = null;
				}
			}
		}
	}
	refrechGrid();
}
