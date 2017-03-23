'use strict';
/*
Setup the inital variables that will be called
*/
const input_number = 2726966;
const number = (""+input_number).split("");
const words = [];
const master_key = [
					["0"],
					["1"],
					["2","A","B","C"],
					["3","D","E","F"],
					["4","G","H","I"],
					["5","J","K","L"],
					["6","M","N","O"],
					["7","P","Q","R","S"],
					["8","T","U","V"],
					["9","W","X","Y","Z"]
				];
const vowels = ["A","E","I","O","U"];
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

function judgeWord(word) {
	//check for vowels
	for (let x = 0; x < vowels.length; x++) {
		if (word.indexOf(vowels[x]) > -1) {
			console.log(word);
			count++;
			break;
		}
	}
}

// Populate the arrays for myKey, maxKeyCount & currentKeyCount
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
	judgeWord(word);
	pushCount(currentKeyCount.length -1);
	
}

console.log(count);