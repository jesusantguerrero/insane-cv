const inquirer = require('inquirer');
const { prompt } = inquirer;
const chalk = require('chalk').default;
const utils = require('./../utils');

inquirer.registerPrompt('recursive', require('inquirer-recursive'))

class Skills {
  create(name, level, type = 'profesional') {
    return {
      name,
      level,
      type
    }
  }

  questions() {
    return [{
      type: 'recursive',
      message: 'want to add new Skill?',
      name: 'skills',
      prompts: [{
          type: 'input',
          name: 'name',
          message: 'skill name: '
        },
        {
          type: 'list',
          name: 'level',
          message: 'your level: ',
          choices: ['beginner', 'intermediate', 'advanced', 'master'],
          default: 'beginner'
        },
        {
          type: 'list',
          name: 'type',
          message: 'skill type: ',
          choices: ['profesional', 'skill', 'languages']
        }
      ]
    },]
  }

  menu(curriculum) {
    this.menu = [{
      type: 'list',
      name: 'order',
      message: 'Skills Menu',
      choices: [
        new inquirer.Separator(),
        'add skill',
        'Edit skill',
        'Delete skill',
        'Exit'
      ],
      default: 'add skill'
    }]

   return prompt(this.menu).then((a) => {
      switch (a.order) {
        case 'add skill':
          return this.add(curriculum)
          break
        case 'Edit skill':{
          const {items, list} = this.loadSkills(curriculum, 'edit')
          return prompt(list)
            .then((r) => this.edit(curriculum, r.index, items[r.index]))
            .then((res) => true)
          }
          break
        case 'Delete skill':  {
          const {items, list} = this.loadSkills(curriculum, 'delete')
          return prompt(list)
            .then((r) => this.delete(curriculum, r.index, items[r.index]))
            .then((res) => true)
          }
          break
        default:
          // nothing
          break
      }
    })
    .then((res) => true)
  }

  edit(curriculum, index, item) {
    const questions = this.questions()[0].prompts
    questions[0].default = item.name
    questions[1].default = item.level
    questions[2].default = item.type

    return prompt(questions).then((network) => {
      curriculum.editSkill(network, index)
      return true
    }).catch((err) => {
      console.log(chalk.red('no edited'))
      return true
    })
    
  }

  delete(curriculum, index, item) {
      curriculum.deleteSkill(index)
      console.log(chalk.red(`${item.name} has been deleted`))
      return true
  }

  loadSkills(curriculum, mode){
    const items = curriculum.getSkills()
    const listMode = items.map((item, i) =>  { return {name: item.name, value: i}})
    const list = [{
      type: 'list',
      name: 'index',
      choices: listMode,
      message: `select an item to ${mode}: `
    }]
    return {items, list}
  }

  add(curriculum) {
    return inquirer.prompt(this.questions())
      .then((r) => {
        r.skills.forEach((skill) => {
          curriculum.addSkill(skill)
        })
        return true
      })
  }
}

module.exports = new Skills()