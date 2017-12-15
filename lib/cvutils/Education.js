const inquirer = require('inquirer');
const {
  prompt
} = inquirer;
const chalk = require('chalk').default;
const utils = require('./../utils');

inquirer.registerPrompt('recursive', require('inquirer-recursive'))

class Education {
  create(degree, institution, start, end, prom) {
    return {
      degree,
      institution,
      start,
      end,
      prom
    }
  }

  questions() {
    return [{
      type: 'recursive',
      message: 'Add new Education item',
      name: 'education',
      prompts: [{
          type: 'input',
          name: 'degree',
          message: 'Degree: '
        },
        {
          type: 'input',
          name: 'institution',
          message: 'Institution: '
        },
        {
          type: 'input',
          name: 'start',
          message: 'Start Year: '
        },

        {
          type: 'input',
          name: 'end',
          message: 'End year:'
        },
        {
          type: 'input',
          name: 'prom',
          message: 'Your score(optional):'
        },
      ]
    }]
  }

  menu(curriculum) {
    this.menu = [{
      type: 'list',
      name: 'order',
      message: 'Education Menu',
      choices: [
        new inquirer.Separator(),
        'add new Education',
        'Edit',
        'Delete',
        'Exit'
      ],
      default: 'add new Education'
    }]

   return prompt(this.menu).then((a) => {
      switch (a.order) {
        case 'add new Education':
          return this.add(curriculum)
          break
        case 'Edit':{
          const {items, list} = this.loadEducation(curriculum, 'edit')
          return prompt(list)
            .then((r) => this.edit(curriculum, r.index, items[r.index]))
            .then((res) => true)
          }
          break
        case 'Delete':  {
          const {items, list} = this.loadEducation(curriculum, 'delete')
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
    questions[0].default = item.degree
    questions[1].default = item.institution
    questions[2].default = item.start
    questions[3].default = item.end
    questions[4].default = item.prom

    return prompt(questions).then((education) => {
      curriculum.editEducation(education, index)
      return true
    }).catch((err) => {
      console.log(chalk.red('no edited'))
      return true
    })
    
  }

  delete(curriculum, index, item) {
      curriculum.deleteEducation(index)
      console.log(chalk.red(`${item.degree} has been deleted`))
      return true
  }

  loadEducation(curriculum, mode){
    const items = curriculum.getEducation()
    const listMode = items.map((item, i) =>  { return {name: item.degree, value: i}})
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
        r.education.forEach((education) => {
          curriculum.addEducation(education)
        })
        return true
      })
  }
}

module.exports = new Education()