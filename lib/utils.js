const fs = require('fs');
const path = require('path');

module.exports = class {
  static scafold(...files) {
    files.forEach((file) => {
      if(typeof file === 'object')
        file = path.resolve(file[0], file[1]) 
      fs.writeFile( path.resolve('curriculum',file), '', (err) => (err) ? null : null)
    })
  }

  static listDir(dirName) {
    fs.readdir(dirName, (err, files) => {
      files.forEach((file) => {
        console.log(file);
      })
    });
  }

  static createFile(dist, stream){
    fs.writeFile(dist, stream, (err) => {
      if (err)
        console.log('this is the error: %s', err)
    })
  }
  static createDir(dirName){
    fs.mkdir(dirName, (err) => {
      if (err) {
        console.log('this file has been created %s', err)
      }  
    })
  }

  static createDirs(...dirs) {
    dirs.forEach((dir) => {
      fs.mkdir(dir, (err) => {
        if(err) {
          console.log('this dir already exists %s', err)
        }
        console.log('creating %s ...', dir)
      })
    })
  }
}

