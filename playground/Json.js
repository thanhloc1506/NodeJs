const fs = require("fs");
const lib = require("./lib")

const book = {
	title: 'Toi thay hoa vang tren co xanh',
	author: 'Nguyen Nhat Anh'
}

// Covert JavaScript object into JSON string
const bookJSON = JSON.stringify(book)

// Covert JSON string into object
const bookObject = JSON.parse(bookJSON) 
const bookContent = fs.readFileSync("book.json", {encoding: "utf-8"});
const bookcont = JSON.parse(bookContent);

//console.log(bookcont.title);
const yargs = require('yargs');
const argv  = require("process");

yargs.version('1.1.0')
yargs.command({ 
	command: 'write',
	handler: (args) => { 
		const {nameDir, fileName} = args;
		lib.writeContent(nameDir, fileName, bookcont.title);
	} 
  }).argv;
