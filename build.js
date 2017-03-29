'use strict';

/*
This is the build file of the application responcible for setting up the dictionary file from a .dic file type.
It also makes sure that only alpha characters pass into the final dictionary file.
*/

// Get required 
const fs = require('fs');

// Initial values
const dictionary = fs.createReadStream('hunspell-en_US-2017.01.22/en_US.dic'); // This pulls from the location of the .dic file
const newDictionaryFile = fs.createWriteStream('dictionary.txt');
const newDictionary = [];
let count = 0;

// Main function to read and parse .dic file contents
function readLines(dictionary, func) {
	var remaining = '';

	dictionary.on('data', function(data) {
		remaining += data;
		var index = remaining.indexOf('\n');
		var last  = 0;
		while (index > -1) {
			var line = remaining.substring(last, index);
			last = index + 1;
			func(line);
			index = remaining.indexOf('\n', last);
		}

		remaining = remaining.substring(last);
	});

	dictionary.on('end', function() {
		if (remaining.length > 0) {
			func(remaining);
		}
		finish()
	});
}

// Function to build out array and only include characters a - z
function addToArr(data) {
	if (data.indexOf('/') > -1) data = data.substring(0, data.indexOf('/'));
	if (data.match(/^[a-z]+$/)) {
		if (data.length < 8 && data.length > 2) {
			newDictionary.push(data);
			count = count + 1;
		}
	}
}


// Function to finish build and write array to dictionary.txt file
function finish() {
	fs.writeFile('dictionary.txt', newDictionary, function (err) {
		if (err) {
			console.error(err);
		}
	});
	console.log("Finished with " + count + " entires. Found in 'dictionary.txt'.");
}

readLines(dictionary, addToArr);
