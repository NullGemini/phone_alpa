'use strict';

// Get required 
const fs = require('fs');

const dictionary = fs.createReadStream('hunspell-en_US-2017.01.22/en_US.dic');
const newDictionaryFile = fs.createWriteStream('dictionary.txt');
const newDictionary = [];
let count = 0;

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

function addToArr(data) {
	if (data.indexOf('/') > -1) data = data.substring(0, data.indexOf('/'));
	if (data.match(/^[a-z]+$/)) {
		if (data.length < 8 && data.length > 2) {
			newDictionary.push(data);
			count = count + 1;
		}
	}
}

function finish() {
	fs.writeFile('dictionary.txt', newDictionary, function (err) {
		if (err) {
			console.error(err);
		}
	});
	console.log("Finished with " + count + " entires. Found in 'dictionary.txt'.");
}

readLines(dictionary, addToArr);
