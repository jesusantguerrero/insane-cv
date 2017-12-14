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
}