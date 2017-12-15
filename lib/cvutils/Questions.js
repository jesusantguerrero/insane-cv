module.exports = {
  networks: {
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
  },

  skills: {
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
  },

}