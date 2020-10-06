const fs = require("fs");

function writeContent(outputDir, filename, content) {
  const filePath = outputDir + "/" + filename;
  fs.access(outputDir, function (error) {
    if (error) {
      fs.mkdirSync(outputDir);
      fs.writeFileSync(filePath, content);
    } else {
      fs.writeFileSync(filePath, content);
    }
  });
}

function deleteContent(direc) {
  if (fs.existsSync(direc)) {
    fs.unlinkSync(direc);
  } else {
    console.log("The file does not exist.");
  }
}

module.exports = {
  writeContent,
  deleteContent,
};
