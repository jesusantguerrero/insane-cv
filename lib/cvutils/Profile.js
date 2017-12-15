module.exports = class Profile {
  constructor(name, role, description, email, number){
    return {
      name,
      role,
      description,
      email,
      number
    }
  }

  static questions() {
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
}