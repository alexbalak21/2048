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
blocks[1][0] = 2;
blocks[1][1] = 2;

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
	for (let i = 0; i < 4; i++) {
		let count = 0;
		for (let j = 3; j >= 0; j--) {
			if (blocks[i][j] == null) {
				count++;
			} else break;
		}

		for (let k = 1; k <= count; k++) {
			blocks[i].pop();
			blocks[i].unshift(null);
		}
	}
	refrechGrid();
}

function left() {
	for (let i = 0; i < 4; i++) {
		let count = 0;
		for (let j = 0; j <= 3; j++) {
			if (blocks[i][j] == null) {
				count++;
			} else break;
		}
		for (let k = 1; k <= count; k++) {
			blocks[i].shift();
			blocks[i].push(null);
		}
	}
	refrechGrid();
}

function up() {
	for (let i = 0; i < 4; i++) {
		let count = 0;
		for (let j = 0; j <= 3; j++) {
			if (blocks[j][i] == null) {
				count++;
			} else break;
		}
		for (let l = 1; l <= count; l++) {
			for (let k = 0; k < 3; k++) {
				blocks[k][i] = blocks[k + 1][i];
			}
			blocks[3][i] = null;
		}
	}
	refrechGrid();
}

function down() {
	for (let i = 0; i < 4; i++) {
		let count = 0;
		for (let j = 3; j >= 0; j--) {
			if (blocks[j][i] == null) {
				count++;
			} else break;
		}
		for (let l = 1; l <= count; l++) {
			for (let k = 2; k >= 0; k--) {
				blocks[k + 1][i] = blocks[k][i];
			}
			blocks[0][i] = null;
		}
	}
	refrechGrid();
}
