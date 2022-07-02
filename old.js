function right2() {
	for (let l = 0; l < 4; l++) {
		for (let k = 0; k < 4; k++) {
			for (let c = 3; c >= 1; c--) {
				//MOVE
				if (line[l][c].v == 0 && line[l][c - 1].v != 0) {
					line[l][c].v = line[l][c - 1].v;
					line[l][c - 1].v = 0;
					//COMBINE
				} else if (line[l][c].v == line[l][c - 1].v) {
					line[l][c].v *= 2;
					line[l][c - 1].v = 0;
					break;
				}
			}
		}
	}
	refrechGrid();
}

function right0() {
	for (let l = 0; l < 4; l++) {
		if (line[l][0].v + line[l][1].v + line[l][2].v + line[l][3].v);
		for (let c = 3; c >= 1; c--) {
			//IF BLOCK IS NOT EMPTY
			if (line[l][c].v != 0) {
				if (line[l][c].v == line[l][c - 1].v) {
					line[l][c].v *= 2;
					line[l][c - 1].v = 0;
				} else if (line[l][c - 1].v == 0) {
					for (let k = c - 2; k >= 0; k--) {
						if (line[l][c].v == line[l][k].v) {
							line[l][c].v *= 2;
							line[l][k].v = 0;
						}
					}
				}
				//IF BLOCK IS EMPTY
			} else {
				console.log("COLUM ", c, "IS EMPTY");
				for (let k = c; k >= 1; k--) {
					console.log("MOVING ", k);
					line[l][k].v = line[l][k - 1].v;
					line[l][k - 1].v = 0;
				}
			}
		}
	}
	refrechGrid();
}
