'use strict';

const input_number = 2726966;
const number = (""+input_number).split("");
const words = [];
const master_key = [[" "],[" "],["A","B","C"],["D","E","F"],["G","H","I"],["J","K","L"],["M","N","O"],["P","Q","R","S"],["T","U","V"],["W","X","Y","Z"]]
const myKey = [];
const maxKeyCount = [];
const currentKeyCount = [];
let count = 0;

function pushCount(x) {
	if (currentKeyCount[x] < maxKeyCount[x] - 1) {
		currentKeyCount[x] = currentKeyCount[x] + 1;
	} else {
		if (x > 0) {
			currentKeyCount[x] = 0;
			pushCount(x-1);
		} else {
			currentKeyCount[0] = currentKeyCount[0] + 1;
		}
	}
}

for (let x = 0; x < number.length; x++) {
	myKey.push(master_key[number[x]]);
	maxKeyCount.push(myKey[x].length);
	currentKeyCount.push(0);
}

while (currentKeyCount[0] < maxKeyCount[0]) {
	let word = "";

	for (let x = 0; x < currentKeyCount.length; x++) {
		word = word + myKey[x][currentKeyCount[x]];
	}
	console.log(word);
	pushCount(currentKeyCount.length -1);
	count++;
}

console.log(count);