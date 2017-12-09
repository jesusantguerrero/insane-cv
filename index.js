#!node
const program = require('commander');
const co = require('co');
const {prompt} = require('inquirer');
const chalk = require('chalk')();
const createRepo = require('./lib/github/create')
const path = require('path');
const os = require('os');
const utils = require('./lib/utils');

const questions = [
  {
    type: 'input',
    name: 'user',
    message: 'username: '
  },
  {
    type: 'pasword',
    name: 'password',
    message: 'password: '
  },
  {
    type: 'input',
    name: 'repo',
    message: 'name of your repo: '
  },
  {
    type: 'input',
    name: 'options',
    message: 'options: '
  },

]

const mainMenu = [
  {
    type: 'list',
    name: 'order',
    message: 'Insane CV Menu',
    choices: ['create new cv', 'add section', 'add item', 'delete section', 'delete item'],
    default: 'create new cv'
  }
]
program
.version('0.0.1')
.description('create repos in github remotely')

program
.command('curriculum')
.alias('cv')
.description('make a custom cv')
.action(()=> {
  prompt(mainMenu).then((a) => {
    switch (a.order) {
      case 'create new cv':
        createCV();
        break;
    
      default:
        console.log('this option is not available')
        break;
    }
    createRepo(a.user, a.password, a.repo, a.options)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
  })
})
 
program.parse(process.argv)


function createCV() {
  const pathName = process.cwd();
  const dirName = `${pathName}\\cv-jesus-guerrero`
  const files = [
    path.resolve('db','cv.js'),
    path.resolve('styles','styles.css'),
    'index.html',
    'index.js'
  ]
  utils.createDir(dirName);
  utils.scafold(dirName, files);
  utils.listDir(dirName);
}
