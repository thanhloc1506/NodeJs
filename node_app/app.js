const fs = require("fs");

const lib = require("./lib");
const outputDir = "output";
const filename = "Hello.txt";
const content = "Hello Kmin 2";
const filePath = outputDir + "/" + filename;

//tmp1.writeContent("output", "hello.txt", "Hello World 1");
//tmp1.deleteContent('output/Hello.txt');
// fs.access("./output", function(error) {
//     if (error) {

//         fs.mkdir("./output", function(err) {
//             if (err) {
//               console.log(err)
//             } else {
//               console.log("New directory successfully created.")
//             }
//           })

//         fs.writeFileSync(filePath, content);
//     } else {
//       console.log("Directory exists.")
//     }
//   })

// console.log(`Writen "${content}" to file "${filename}"`)

// console.log('Written "%s" to file "%s"', content, filename);
// console.log(`Written "` + content + '" to file "' + filename +'"');

// delete a file
// fs.unlink('Hello.txt', (err) => {
//     if (err) {
//         throw err;
//     }

// console.log("\x1b[34m", "File is deleted.");
const chalk = require("chalk");

console.log(chalk.blue("Hello world 111 !"));
//console.log(process.argv[2]);
const yargs = require("yargs");
const argv = require("process");

yargs.version("1.1.0");

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    description: {
      describe: "Note description",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (args) {
    const { title, description } = args;
    console.log("Title: " + title);
    console.log("Description: " + description);
    const noteAdd = {title, description};

    const Arrnotes = lib.load('note.json');
    if(lib.checkNote(Arrnotes, noteAdd)){
      Arrnotes.push(noteAdd);
    }
    lib.saveNote('note.json', Arrnotes);
  },
}).argv;
// });
