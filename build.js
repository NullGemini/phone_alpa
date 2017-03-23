'use strict';

// Get required 
const fs = require('fs');
const list = fs.readFileSync('hunspell-en_US-2017.01.22/en_US.dic', {encoding:'utf8'});