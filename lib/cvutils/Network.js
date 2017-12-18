const inquirer = require('inquirer');
const { prompt } = inquirer;
const chalk = require('chalk').default;
const utils = require('./../utils');

inquirer.registerPrompt('recursive', require('inquirer-recursive'))

class Network {
  create(name, shortname, link) {
    return {
      name,
      shortname,
      link
    }
  }

  questions() {
    return [{
      type: 'recursive',
      message: 'want to add a new network?',
      name: 'networks',
      prompts: [{
          type: 'input',
          name: 'name',
          message: 'network name(eg. github): '
        },
        {
          type: 'input',
          name: 'shortname',
          message: 'shortname (gh): '
        },
        {
          type: 'input',
          name: 'link',
          message: 'the link: '
        }
      ]
    }]
  }

  menu(curriculum) {
    this.menu = [{
      type: 'list',
      name: 'order',
      message: 'Networks/social Menu',
      choices: [
        new inquirer.Separator(),
        'add network',
        'Edit network',
        'Delete network',
        'Exit'
      ],
      default: 'add network'
    }]

   return prompt(this.menu).then((a) => {
      switch (a.order) {
        case 'add network':
          return this.add(curriculum)
          break
        case 'Edit network':{
          const {items, list} = this.loadNetworks(curriculum, 'edit')
          return prompt(list)
            .then((r) => this.edit(curriculum, r.index, items[r.index]))
            .then((res) => true)
          }
          break
        case 'Delete network':  {
          const {items, list} = this.loadNetworks(curriculum, 'delete')
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
    questions[1].default = item.shortname
    questions[2].default = item.link

    return prompt(questions).then((network) => {
      curriculum.editNetwork(network, index)
      return true
    }).catch((err) => {
      console.log(chalk.red('no edited'))
      return true
    })
    
  }

  delete(curriculum, index, item) {
      curriculum.deleteNetwork(index)
      console.log(chalk.red(`${item.name} has been deleted`))
      return true
  }

  loadNetworks(curriculum, mode){
    const items = curriculum.getNetworks()
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
        r.networks.forEach((network) => {
          curriculum.addNetwork(network)
        })
        return true
      })
  }
}

module.exports = new Network()