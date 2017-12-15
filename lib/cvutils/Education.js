module.exports = class Education {
    constructor(degree, institution, start, end, prom) {
      return {
        degree,
        institution,
        start,
        end,
        prom
      }
    }

    static questions() {
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
  }