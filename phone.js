'use strict';

/*
This is the main file of the application responcible for seeing what words are contained in the phone number
*/

// Get required 
const fs = require('fs');

/*
Setup the inital variables that will be called
*/
const file = fs.readFileSync("dictionary.txt", "utf-8");
const dictionary = file.split(",");

console.log("Using dictionary size of: " + dictionary.length);

module.exports = function(input_number) {

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
	const myKey = [];
	const maxKeyCount = [];
	const currentKeyCount = [];
	const results = [];
	let count = 0;

	// Main function to keep track of the currentKeyCount 
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

	// Function responsible for checking to see if a word in dictionary file is contained in the current word
	function judgeWord(word) {
		for (let x = 0; x < dictionary.length; x++) {
			if (word.indexOf(dictionary[x]) > -1) {
				results.push(dictionary[x], word);
				count++; //increment count
				break;
			}
		}
	}

	console.log("Building Key...");
	// Populates the arrays for myKey, maxKeyCount & currentKeyCount
	for (let x = 0; x < number.length; x++) {
		myKey.push(master_key[number[x]]);
		maxKeyCount.push(myKey[x].length);
		currentKeyCount.push(0);
	}

	console.log("Starting Search...");
	// The main loop to run through all possible iterations in phone number
	while (currentKeyCount[0] < maxKeyCount[0]) {
		let word = "";

		for (let x = 0; x < currentKeyCount.length; x++) {
			word = word + myKey[x][currentKeyCount[x]];
		}
		judgeWord(word.toLowerCase());
		pushCount(currentKeyCount.length -1);
		
	}

		return(results.toString());
		console.log("Finished! Words found: " + count);
}