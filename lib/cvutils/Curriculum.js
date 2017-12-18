module.exports = class Curriculum {
  constructor(){
    this.profile = null
    this.education = []
    this.networks = []
    this.skills = {
      profesional: [],
      languages: [],
      soft: []
    }
    this.experience = [],
    this.quote = '',
    this.references = []
  }

  setProfile(profile) {
    this.profile = profile
  }

  getProfile() {
    return this.profile
  }

  emptyProfile() {
    this.profile = null
  }

  // Education

  addEducation(educationItem) {
    this.education.push(educationItem)
  }

  getEducation() {
    return (this.education.length <= 0) ? [] : this.education
  }

  editEducation(educationItem, index) {
    this.education[index] = educationItem 
  }

  deleteEducation(index) {
    return this.education.splice(index, 1)
  }

  //networks
  addNetwork(networkItem) {
    this.networks.push(networkItem)
  }

  getNetworks() {
    return this.networks
  }

  editNetwork(networkItem, index) {
    this.networks[index] = networkItem
  }

  deleteNetwork(index) {
    return this.networks.splice(index, 1)
  }


  // Skills

  addSkill(name, level, type = 'profesional') {
    const newSkill = {name, level, type}
    if (!this.skills.hasOwnProperty(type)) {
      this.skills[type] = []
    }
    this.skills[type].push(newSkill)
    return newSkill
  }

  getSkills(type) {
    return this.skills[type]
  }

  deleteSkill(index, type) {
    return this.skills[type].splice(index, 1)
  }

  // Experience
  addExperience(position, company, location, start, end, jobDescription, highlights){
    const experience = {position, company, location, start, end, jobDescription, highlights}
    this.experience.push(experience)
    return experience
  }

  getExperience() {
    return this.experience
  }

 
  deleteExperience(index) {
    return this.experience.splice(index, 1)
  }

  getCurriculum() {
    return {
      profile: this.profile,
      education: this.education,
      networks: this.networks,
      skills: this.skills,
      experience: this.experience,
      references: this.references,
      quote: this.quote
    }
  }

  load(curriculum) {
    this.profile = curriculum.profile
    this.education = curriculum.education
    this.networks = curriculum.networks
    this.skills = curriculum.skills 
    this.experience = curriculum.experience
    this.references = curriculum.references
    this.quote = curriculum.quote
    
   }

}