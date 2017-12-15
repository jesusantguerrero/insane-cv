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
    return (this.education.length <= 0) ? [] : this.education.sort((a, b) => (a.start > b.start)? -1 : 1  )
  }

  deleteEducation(index) {
    this.education.splice(index,1)
  }

  //networks

  addNetwork(name, shortname,link) {
    const newNetwork = {name, shortname, link}
    this.networks.push(newNetwork)
    return newNetwork
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

  getNetworks() {
    return this.networks
  }

  getCurriculum() {
    return {
      profile: this.profile,
      education: this.education,
      networks: this.networks,
      skills: this.skills
    }
  }

  load(curriculum) {
    this.profile = curriculum.profile
    this.education = curriculum.education
    this.networks = curriculum.networks
    this.skills = curriculum.skills 
    
   }

}