const fs = require('fs');
const path = require('path');

module.exports = class {
  static scafold(...files) {
    files.forEach((file) => {
      if(typeof file === 'object')
        file = path.resolve(file[0], file[1]) 
      fs.writeFileSync( path.resolve('curriculum',file), '')
    })
  }

  static listDir(dirName) {
    fs.readdirSync(dirName)
  }

  static createFile(dist, stream){
    fs.writeFileSync(dist, stream)

  }
  static createDir(dirName){
    fs.mkdirSync(dirName)
  }

  static createDirs(...dirs) {
    dirs.forEach((dir) => {
      fs.mkdirSync(dir)
    })
  }
}

