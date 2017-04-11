const fs = require('fs');
const options = JSON.parse(fs.readFileSync('package.json'));
const http = require('http');
const formidable = require("formidable");
const util = require('util');
const phone = require('./phone.js');

const server = http.createServer(function (req, res) {
	if (req.method.toLowerCase() == 'get') {
		displayForm(res);
	} else if (req.method.toLowerCase() == 'post') {
		processPhone(req, res);
	}

});

function displayForm(res) {
	fs.readFile('www/index.html', function (err, data) {
		res.writeHead(200, {
			'Content-Type': 'text/html',
				'Content-Length': data.length
		});
		res.write(data);
		res.end();
	});
}

function processPhone(req, res) {
	var form = new formidable.IncomingForm();

	form.parse(req, function (err, fields) {
		//Store the data from the fields in your data store.
		//The data store could be a file or database or any other store based
		//on your application.
		res.writeHead(200, {
			'content-type': 'text/plain'
		});
		res.write('received the data:\n\n');
		res.end(phone(fields['phone']));
	});
}

server.listen(options.webServer.port);
console.log(`web server started on port ${options.webServer.port}.`);