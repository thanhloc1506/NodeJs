const fs = require("fs");

function writeContent(outputDir, filename, content){
    const filePath = outputDir + "/" + filename;
    fs.access(outputDir, function(error){
        if (error) {
            fs.mkdirSync(outputDir);
            fs.writeFileSync(filePath, content);
        }
        else {
            fs.writeFileSync(filePath, content);
        }
    })
}

function deleteContent(direc){
    if(fs.existsSync(direc)) {
        fs.unlinkSync(direc);
    } else {
        console.log('The file does not exist.');
    }
}

function load(fileName){
    try{
        const nodtesJson = fs.readFileSync(fileName, {encoding: "utf-8"})
        return JSON.parse(nodtesJson);
    }catch (error){
        return [];
    }
}

function saveNote(fileName, notes){
    const noteJson = JSON.stringify(notes);
    fs.writeFileSync(fileName, noteJson);
}

function checkNote(arrNote, newNote){
    for (const property in arrNote) {
        if(arrNote[`${property}`].title == newNote.title){
            console.log('Note is exist');
            return false;
        }
      }
    return true;
}


module.exports = {
    writeContent,
    deleteContent,
    load,
    saveNote,
    checkNote
}