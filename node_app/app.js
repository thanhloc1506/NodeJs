const fs = require("fs");
const lib = require("./notes");
const chalk = require("chalk");
const yargs = require("yargs");
const argv = require("process");
yargs.version("1.1.0");
fileName = 'note.json'; 
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
      const Arrnotes = lib.load(fileName);
      if (lib.checkNote(Arrnotes, noteAdd)) {
        Arrnotes.push(noteAdd);
      }
      lib.saveNote(fileName, Arrnotes);
    },
  })
  .command({
    command: "remove",
    describe: "Remove a new note",
    handler: ({ title }) => {
      const Arrnotes = lib.load(fileName);
      lib.removeNote(Arrnotes, title);
    },
  })
  .command({
    command: "list",
    aliases: "ls",
    describe: "List all note",
    handler: () => {
      const Arrnotes = lib.load(fileName);
      for (const i in Arrnotes) {
        console.log("Title: " + Arrnotes[i].title);
        console.log("Description: " + Arrnotes[i].description);
      }
    },
  })
  .command({
    command: "read",
    describe: "Read a note",
    handler: ({ title }) => {
      lib.getNote(title, lib.load(fileName));
    }
  }).argv;
//
// });
