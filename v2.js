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

class Block {
	constructor(l = 0, c = 0, v = 0, n = 0) {
		this.l = l;
		this.c = c;
		this.v = v;
		this.n = n;
	}
}

//CREATING LOGIC GRID
let blocks = new Array(16);
let b = 0;
let line = new Array(4);
for (let l = 0; l <= 3; l++) {
	line[l] = new Array(4);
	for (let c = 0; c <= 3; c++) {
		line[l][c] = new Block(l, c, 0);
		blocks[b] = line[l][c];
		blocks[b].n = b;
		b++;
	}
}

let col = new Array(4);
for (let c = 0; c <= 3; c++) {
	col[c] = new Array(4);
	for (let l = 0; l <= 3; l++) {
		col[c][l] = line[l][c];
	}
}

function generateBlock() {
	let max = blocks.length - 1;
	if (max >= 0) {
		let index = Math.round(Math.random() * max);
		let chance = Math.round(Math.random() * 10);
		let value = 2;
		if (chance == 1) value = 4;
		blocks[index].v = value;

		blocks.splice(index, 1);
	}
}

function refrechGrid() {
	for (let l = 0; l < 4; l++) {
		for (let c = 0; c < 4; c++) {
			if (line[l][c].v == 0) {
				gameGrid[l][c].innerText = "";
				gameGrid[l][c].style.backgroundColor = "#abaaab";
			} else {
				gameGrid[l][c].innerText = line[l][c].v;
				gameGrid[l][c].style.backgroundColor = "dodgerblue";
			}
		}
	}
	console.log(blocks.length);
}

function input() {
	document.addEventListener("keydown", (event) => {
		if (event.key === "ArrowLeft") left();
		if (event.key === "ArrowRight") right();
		if (event.key === "ArrowUp") up();
		if (event.key === "ArrowDown") down();
	});
}

function shiftArray(arr, e, b) {
	let i = 0;
	if (b) {
		//UP
		for (let k = e; k >= 1; k--) {
			arr[k].v = arr[k - 1].v;
			arr[k - 1].v = 0;
			i = k;
		}
		//BLOCK e = e+1
	} else {
		//DOWN
		for (let k = e; k <= 2; k++) {
			arr[k].v = arr[k + 1].v;
			arr[k + 1].v = 0;
			i = k;
		}
	}
	blocks.splice(e, 1);
	blocks.push(arr[i]);
}

function right() {
	//MOVE
	for (let l = 0; l <= 3; l++) {
		//CHECKS IF LINE IS EMPTY
		if (line[l][0].v + line[l][1].v + line[l][2].v + line[l][3].v) {
			for (let c = 3; c >= 1; c--) {
				for (let i = c; i >= 1; i--)
					if (line[l][c].v == 0) {
						shiftArray(line[l], c, 1);
					}
			}
			//COMBINE
			for (let c = 3; c >= 1; c--) {
				if (line[l][c].v != 0 && line[l][c].v == line[l][c - 1].v) {
					line[l][c].v *= 2;
					blocks.push(line[l][c - 1]);
					shiftArray(line[l], c - 1, 1);
				}
			}
		}
	}
	generateBlock();
	refrechGrid();
}

function left() {
	for (let l = 0; l <= 3; l++) {
		if (line[l][0].v + line[l][1].v + line[l][2].v + line[l][3].v)
			for (let c = 0; c <= 2; c++) {
				for (let i = c; i <= 2; i++) if (line[l][c].v == 0) shiftArray(line[l], c, 0);
			}
		for (let c = 0; c <= 2; c++) {
			if (line[l][c].v != 0 && line[l][c].v == line[l][c + 1].v) {
				line[l][c].v *= 2;
				blocks.push(line[l][c + 1]);
				shiftArray(line[l], c + 1, 0);
			}
		}
	}
	generateBlock();
	refrechGrid();
}

function up() {
	for (let c = 0; c <= 3; c++) {
		if (col[c][0].v + col[c][1].v + col[c][2].v + col[c][3].v)
			for (let l = 0; l <= 2; l++) {
				for (let i = l; i <= 2; i++) if (col[c][l].v == 0) shiftArray(col[c], l, 0);
			}
		for (let l = 0; l <= 2; l++) {
			if (col[c][l].v != 0 && col[c][l].v == col[c][l + 1].v) {
				col[c][l].v *= 2;
				blocks.push(col[c][l + 1]);
				shiftArray(col[c], l + 1, 0);
			}
		}
	}
	generateBlock();
	refrechGrid();
}

function down() {
	for (let c = 0; c <= 3; c++) {
		if (col[c][0].v + col[c][1].v + col[c][2].v + col[c][3].v) {
			for (let l = 3; l >= 1; l--) {
				for (let i = l; i >= 1; i--) if (col[c][l].v == 0) shiftArray(col[c], l, 1);
			}
			for (let l = 3; l >= 1; l--) {
				if (col[c][l].v != 0 && col[c][l].v == col[c][l - 1].v) {
					col[c][l].v *= 2;
					blocks.push(col[c][l - 1]);
					shiftArray(col[c], l - 1, 1);
				}
			}
		}
	}
	generateBlock();
	refrechGrid();
}

generateBlock();
generateBlock();

refrechGrid();
input();
