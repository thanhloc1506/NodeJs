const fs = require("fs");

const lib = require("./lib");
const outputDir = "output";
const filename = "Hello.txt";
const content = "Hello Kmin 2";
const filePath = outputDir + "/" + filename;

//tmp1.writeContent("output", "hello.txt", "Hello World 1");
//tmp1.deleteContent('output/Hello.txt');

// console.log(`Writen "${content}" to file "${filename}"`)
// console.log('Written "%s" to file "%s"', content, filename);
// console.log(`Written "` + content + '" to file "' + filename +'"');

const chalk = require("chalk");

console.log(chalk.blue("Hello world 111 !"));
const yargs = require("yargs");
const argv = require("process");

yargs.version("1.1.0");

yargs
  .command({
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

    handler: (args) => {
      const { title, description } = args;
      console.log("Title: " + title);
      console.log("Description: " + description);
      const noteAdd = { title, description };
      const Arrnotes = lib.load("note.json");
      if (lib.checkNote(Arrnotes, noteAdd)) {
        Arrnotes.push(noteAdd);
      }
      lib.saveNote("note.json", Arrnotes);
    },
  })
  .command({
    command: "remove",
    describe: "Remove a new note",
    handler: function (args) {
      const { title } = args;
    },
    handler: ({ title }) => {
      const Arrnotes = lib.load("note.json");
      lib.removeNote(Arrnotes, title);
    },
  })
  .command({
    command: "list",
    describe: "List all note",
    handler: (args) => {
      const Arrnotes = lib.load("note.json");
      for (const i in Arrnotes) {
        console.log("Title: " + Arrnotes[i].title);
        console.log("Descripsion: " + Arrnotes[i].description);
      }
    },
  })
  .alias("list", "ls").argv;
//
// });
