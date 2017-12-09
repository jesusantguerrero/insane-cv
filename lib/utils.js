const fs = require('fs');
const path = require('path');

module.exports = class {
  static scafold(root, files) {
    files.forEach((file) => {
      fs.writeFile(path.resolve(root, file), 'hello world', (err) => (err) ? null : null)
    })
  }

  static listDir(dirName) {
    fs.readdir(dirName, (err, files) => {
      files.forEach((file) => {
        console.log(file);
      })
    });
  }

  static createDir(dirName){
    fs.mkdir(dirName, (err) => {
      if (err) {
        console.log('this file has been created')
      }  
    })
  }
}

