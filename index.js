#!node

const os = require('os');
const path = require('path');
const program = require('commander');
const co = require('co');
const simplePrompt = require('co-prompt');
const inquirer = require('inquirer');
const {
  prompt
} = inquirer;
const chalk = require('chalk').default;
const inquirerRecursive = require('inquirer-recursive')
const createRepo = require('./lib/github/create')
const utils = require('./lib/utils');
const Questions = require('./lib/cvutils/Questions')

inquirer.registerPrompt('recursive', inquirerRecursive)


const mainMenu = [{
  type: 'list',
  name: 'order',
  message: 'Insane CV Menu',
  choices: ['create new cv', 'add section', 'add item', 'delete section', 'delete item'],
  default: 'create new cv'
}]
program
  .version('0.0.1')
  .description('create repos in github remotely')

program
  .command('curriculum')
  .alias('cv')
  .description('make a custom cv')
  .action(() => {
    prompt(mainMenu).then((a) => {
      switch (a.order) {
        case 'create new cv':
          createCV();
          break;
        default:
          console.log('this option is not available')
          break;
      }
    })
  })

program.parse(process.argv)

function createCV() {
  const Curriculum = require('./lib/cvutils/Curriculum')
  const curriculum = new Curriculum()
  let educationMode = 'no'
  setProfile(curriculum)
    .then((res) => {
      return addEducation(curriculum)
    })
    .then((res) => {
      return addNetworks(curriculum)
    })
    .then((res) => {
      return addSkills(curriculum)
    })
    .then((res) => {
      buildCv(curriculum)
    })
    .catch((err) => {
      console.log(err)
    })
}

function setProfile(curriculum) {
  const Profile = require('./lib/cvutils/Profile')
  let addAnother = true;
  return prompt(Profile.questions())
    .then((r) => {
      const profile = new Profile(r.name, r.role, r.description, r.email, r.number)
      curriculum.setProfile(profile)
      return true
    })
}

function addEducation(curriculum) {
  const Education = require('./lib/cvutils/Education')
  return inquirer.prompt(Education.questions())
    .then((r) => {
      r.education.forEach((item) => {
        const education = new Education(item.degree, item.institution, item.start, item.end, item.prom)
        curriculum.addEducation(education)
      })
      return true
    })
}

function addNetworks(curriculum) {
  return prompt(Questions.networks)
    .then((r) => {
      r.networks.forEach((item) => {
        curriculum.addNetwork(item.name, item.shortname, item.link)
      })
      return true
    })
}

function addSkills(curriculum) {
  return prompt(Questions.skills)
  .then((r) => {
    r.skills.forEach((item) => {
      curriculum.addSkill(item.name, item.level, item.type)
    })
    return true
  })
}

function buildCv(curriculum) {
  console.log(chalk.hex('#0066ff')('Building your curriculum'))
  const assets = path.resolve('curriculum','assets\\')
  const css = path.resolve('curriculum','assets','css')
  const js = path.resolve('curriculum','assets','js')
  const img = path.resolve('curriculum','assets','img')
  const db = path.resolve('curriculum','assets','db')

  utils.createDir('curriculum')
  utils.createDirs(assets, css, js, img, db)
  utils.scafold([css, 'styles.css'], [js, 'app.js'], 'index.html', 'server.js')
  utils.createFile(path.resolve(db, 'cv.json'), JSON.stringify(curriculum.getCurriculum()))
  console.log(utils.listDir('curriculum'))
  console.log(chalk.hex('#0066ff')('ready to go!'))
}