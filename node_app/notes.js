const fs = require("fs");

const writeContent = (outputDir, filename, content) => {
  const filePath = outputDir + "/" + filename;
  fs.access(outputDir, function (error) {
    if (error) {
      fs.mkdirSync(outputDir);
      fs.writeFileSync(filePath, content);
    } else {
      fs.writeFileSync(filePath, content);
    }
  });
};

const deleteContent = (direc) => {
  if (fs.existsSync(direc)) {
    fs.unlinkSync(direc);
  } else {
    console.log("The file does not exist.");
  }
};

const load = (fileName) => {
  try {
    const nodtesJson = fs.readFileSync(fileName, { encoding: "utf-8" });
    return JSON.parse(nodtesJson);
  } catch (error) {
    return [];
  }
};

const saveNote = (fileName, notes) => {
  const noteJson = JSON.stringify(notes);
  fs.writeFileSync(fileName, noteJson);
};

const checkNote = (arrNote, newNote) => {
  for (const property in arrNote) {
    if (arrNote[`${property}`].title == newNote.title) {
      console.log("Note is existed");
      return false;
    }
  }
  return true;
};

const findNoteByTittle = (noteTitle, notes) =>
  notes.find((notes) => notes.title === noteTitle);

const removeNote = (arrNote, title) => {
  if (findNoteByTittle(title, arrNote)) {
    saveNote(
      "note.json",
      arrNote.filter((note) => note.title !== title)
    );
  }
};

const getNote = (noteTitle, notes) => {
  if (!findNoteByTittle(noteTitle, notes)) {
    console.log(`${noteTitle} doesn't exist`);
    return;
  }
  for (const property in notes) {
    if (notes[`${property}`].title == noteTitle) {
      console.log("Title: " + notes[`${property}`].title);
      console.log("Description: " + notes[`${property}`].description);
      break;
    }
  }
};

module.exports = {
  writeContent,
  deleteContent,
  load,
  saveNote,
  checkNote,
  findNoteByTittle,
  removeNote,
  getNote,
};
