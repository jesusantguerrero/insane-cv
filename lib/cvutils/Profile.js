const inquirer = require('inquirer');
const { prompt } = inquirer;
const chalk = require('chalk').default;
const utils = require('./../utils');

inquirer.registerPrompt('recursive', require('inquirer-recursive'))
class Profile {
  create(name, role, description, email, number){
    return {
      name,
      role,
      description,
      email,
      number
    }
  }

  questions() {
    return [
      {
        type: 'input',
        name: 'name',
        message: 'Your Name: '
      },
      {
        type: 'input',
        name: 'role',
        message: 'Your Role: '
      },
      {
        type: 'input',
        name: 'description',
        message: 'A description about you: '
      },

      {
        type: 'input',
        name: 'email',
        message: 'Email:'
      },
      {
        type: 'input',
        name: 'number',
        message: 'Phone Number:'
      }
    ]
  }

  menu(curriculum) {
    this.menu = [{
      type: 'list',
      name: 'order',
      message: 'Profile Menu',
      choices: [
        new inquirer.Separator(),
        'add profile',
        'Edit profile',
        'Delete profile',
        'Exit'
      ],
      default: 'add profile'
    }]

   return prompt(this.menu).then((a) => {
      switch (a.order) {
        case 'add profile':
          return this.add(curriculum)
          break
        case 'Edit profile':{
          const item = curriculum.getProfile()
          return this.edit(curriculum, item)
          }
          break
        case 'Delete profile':  
          return this.delete(curriculum)
          break
        default:
          // nothing
          break
      }
    })
    .then((res) => true)
  }

  edit(curriculum, item) {
    const questions = this.questions()
    questions[0].default = item.name
    questions[1].default = item.role
    questions[2].default = item.description
    questions[3].default = item.email
    questions[4].default = item.number
    return prompt(questions).then((profile) => {
      curriculum.setProfile(profile, index)
      return true
    }).catch((err) => {
      console.log(chalk.red('no edited'))
      return true
    })
    
  }

  delete(curriculum, index, item) {
      curriculum.emptyProfile()
      console.log(chalk.red(` the profile has been deleted`))
      return true
  }

  add(curriculum) {
    return inquirer.prompt(this.questions())
      .then((profile) => {
        curriculum.setProfile(profile)
        return true
      })
  }
}

module.exports = new Profile()