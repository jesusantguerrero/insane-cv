#!node
const program = require('commander');
const co = require('co');
const prompt = require('co-prompt');
const chalk = require('chalk')();
const createRepo = require('./utils/github/create')

// program
// .arguments('cv')
// .option('-n, --name <name>', 'The name of the cv owner')
// .option('-r, --role <role>', 'The role you are applying for')

// .action((cv) => {
//   co(function *() {
//     const name = yield prompt('name: ')
//     const role = yield prompt('role: ')
//     console.log(`%s - %s , thanks for building your cv with us`,name, role)
//   })
// }) 
// .parse(process.argv)
program
.version('0.0.1')
.description('create repos in github remotely');

program
.command('github <user> <password> <repo>')
.option('-u, --user <user>','your github username')
.option('-p', '--password <password>', 'your githun password')
.option('-r', '--repo <my_repo>', 'the name of your new repo')
.action((github) => {
    createRepo(user, password, repo, options)
    .then((res) => console.log(res)) 
})
.parse(process.argv)