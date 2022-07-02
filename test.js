function input() {
	document.addEventListener("keydown", (event) => {
		if (event.key === "ArrowLeft") left();
		if (event.key === "ArrowRight") right();
		if (event.key === "ArrowUp") up();
		if (event.key === "ArrowDown") down();
	});
}

let row = document.getElementById("row");

let disp = new Array(4);

for (let i = 0; i < 4; i++) {
	disp[i] = document.createElement("td");
	row.appendChild(disp[i]);
}

let arr = [0, 4, 0, 2];

function refrech() {
	for (let i = 0; i < 4; i++) {
		if (arr[i] == 2) disp[i].style.backgroundColor = "dodgerblue";
		else if (arr[i] == 4) disp[i].style.backgroundColor = "green";
		else if (arr[i] == 8) disp[i].style.backgroundColor = "red";
		else disp[i].style.backgroundColor = "white";
	}
}

refrech();
input();

function right2() {
	let min = 1;
	for (let c = 3; c >= min; c--) {
		//CHECKING 3 TIMES OR LESS
		console.log("CHECK COLUM ", c);
		for (let e = c; e >= 1; e--) {
			console.log(e, " time ");

			// THE BLOCK C IS EMPTY
			if (!arr[c]) {
				//SHIFTING ARRAY TO THE EMPTY BLOCK
				for (let k = c; k >= 1; k--) {
					arr[k] = arr[k - 1];
					arr[k - 1] = 0;
				}
				min++;
			}
		}
	}
	refrech();
	console.log(arr);
}

function right() {
	//MOVE
	for (let c = 3; c >= 1; c--) {
		for (let i = c; i >= 1; i--) {
			//CHECK C
			if (!arr[c]) {
				for (let k = c; k >= 1; k--) {
					//SHIFTING ARRAY TO THE EMPTY BLOCK
					arr[k] = arr[k - 1];
					arr[k - 1] = 0;
				}
			}
		}
	}
	//COMBINE
	for (let c = 3; c >= 1; c--) {
		if (arr[c] != 0 && arr[c] == arr[c - 1]) {
			arr[c] *= 2;
			//SHIFTING ARRAY TO THE EMPTY BLOCK
			for (let k = c - 1; k >= 1; k--) {
				arr[k] = arr[k - 1];
				arr[k - 1] = 0;
			}
		}
	}
	console.log(arr);
	refrech();
}

function right0() {
	let min = 1;
	for (let c = 3; c >= min; c--) {
		while (!arr[c] && min <= c) {
			console.log("CHECK ", c);
			//SHIFTING ARRAY TO THE EMPTY BLOCK
			for (let k = c; k >= 1; k--) {
				console.log("MOVING ", k - 1, " TO ", k);
				arr[k] = arr[k - 1];
				arr[k - 1] = 0;
			}
			min++;
		}
	}
	refrech();
}
