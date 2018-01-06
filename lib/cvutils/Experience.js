const inquirer = require('inquirer');
const { prompt } = inquirer;
const chalk = require('chalk').default;
const utils = require('./../utils');

inquirer.registerPrompt('recursive', require('inquirer-recursive'))

class Experience {
  create(position, company, location, start, end, jobDescription, highlights) {
    return {
      position, 
      company, 
      location, 
      start, 
      end, 
      jobDescription, 
      highlights
    }
  }

  questions() {
    return [{
      type: 'recursive',
      message: 'want to add new experience?',
      name: 'experiences',
      prompts: [{
          type: 'input',
          name: 'position',
          message: 'position or role: '
        },
        {
          type: 'input',
          name: 'company',
          message: 'company name: '
        },
  
        {
          type: 'input',
          name: 'location',
          message: 'location: '
        },
        {
          type: 'input',
          name: 'start',
          message: 'start date(mm-yyyy): '
        },
  
        {
          type: 'input',
          name: 'end',
          message: 'end date(mm-yyyy): '
        },
        {
          type: 'editor',
          name: 'description',
          message: 'a short description about your role: '
        },
        
        {
          type: 'recursive',
          message: 'want to add a new highlight for this job?',
          name: 'highlights',
          prompts: [{
            type: 'input',
            name: 'item',
            message: 'highlight: '
          }]
        }
      ]
    }]
  }

  menu(curriculum) {
    this.menu = [{
      type: 'list',
      name: 'order',
      message: 'Experience Menu',
      choices: [
        new inquirer.Separator(),
        'add experience',
        'Edit experience',
        'Delete experience',
        'Exit'
      ],
      default: 'add experience'
    }]

   return prompt(this.menu).then((a) => {
      switch (a.order) {
        case 'add experience':
          return this.add(curriculum)
          break
        case 'Edit experience':{
          const {items, list} = this.loadExperience(curriculum, 'edit')
          return prompt(list)
            .then((r) => this.edit(curriculum, r.index, items[r.index]))
            .then((res) => true)
          }
          break
        case 'Delete experience':  {
          const {items, list} = this.loadExperience(curriculum, 'delete')
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
    questions[0].default = item.position
    questions[1].default = item.company
    questions[2].default = item.location
    questions[3].default = item.start
    questions[4].default = item.end
    questions[5].default = item.jobDescription
    questions[6].highlights = item.highlights

    return prompt(questions).then((experience) => {
      curriculum.editExperience(experience, index)
      return true
    }).catch((err) => {
      console.log(chalk.red('no edited'))
      return true
    })
    
  }

  delete(curriculum, index, item) {
      curriculum.deleteExperience(index)
      console.log(chalk.red(`${item.position} - ${item.company} has been deleted`))
      return true
  }

  loadExperience(curriculum, mode){
    const items = curriculum.getExperience()
    const listMode = items.map((item, i) =>  { return {name: `${item.position} - ${item.company}`, value: i}})
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
        r.experiences.forEach((experience) => {
          curriculum.addExperience(experience)
        })
        return true
      })
  }
}

module.exports = new Experience()