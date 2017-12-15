#!usr/node

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
const Education = require('./lib/cvutils/Education')
const clear = require('clear')
const cli = require('clui')

inquirer.registerPrompt('recursive', inquirerRecursive)


const mainMenu = [{
  type: 'list',
  name: 'order',
  message: 'Insane CV',
  choices: [ 
    'create new cv', 
    'Profile',
    'Education',
    'Networks',
    'Skills',
    'Experience',
    'Quote',
    'Display'
  ],
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
    clear()
    if (!loadCv()) {
      mainMenu[0].choices = ['create new cv']
    } else {
      mainMenu[0].message = `Insane CV ${chalk.blueBright('cv.json Loaded!')}`
    }
    prompt(mainMenu).then((a) => {
      switch (a.order) {
        case 'create new cv':
          createCV()
          break
        case 'Education': {
            const curriculum = loadCv();
            Education.menu(curriculum)
            .then((res) => {
              saveCV(curriculum)
            })
          }
          break
        default:
          console.log('this option is not available')
          break
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
      return Education.add(curriculum)
    })
    .then((res) => {
      return addNetworks(curriculum)
    })
    .then((res) => {
      return addSkills(curriculum)
    })
    .then((res) => {
      return addExperience(curriculum)
    })
    .then((res) => {
      buildCv(curriculum)
    })
    .catch((err) => {
      console.log(err)
    })
}

function editCV(){
  const Curriculum = loadCv()
}

function loadCv() {
  try {
    const Curriculum = require('./lib/cvutils/Curriculum')
    const curriculum = new Curriculum()
    const currentCV = require(path.resolve(process.cwd(),'assets','db','cv.json'))
    curriculum.load(currentCV)
    return curriculum
  } catch(e) {
    return false
  }
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

function addExperience(curriculum) {
  return prompt(Questions.experience)
  .then((r) => {
    r.experiences.forEach((item) => {
      curriculum.addSkill(item.position, item.company, item.location, item.start, item.end, item.description, item.highlights)
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

function saveCV(curriculum){
  const db = path.resolve('assets','db')
  const spinner = new cli.Spinner('saving changes...')
  cli.Clear()
  spinner.start()
  utils.createFile(path.resolve(db, 'cv.json'), JSON.stringify(curriculum.getCurriculum()))
  spinner.stop()
  console.log(chalk.hex('#f20')('saved!'))
}