module.exports = {
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

  experience: {
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
  },

}