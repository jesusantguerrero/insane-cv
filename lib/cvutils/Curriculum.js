module.exports = class Curriculum {
  constructor(){
    this.profile = null
    this.education = []
    this.networks = []
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
    this.education.splice(1,1)
  }

  //networks

  addNetwork(name, shortname,link) {
    const newNetwork = {name, shortname, link}
    this.networks.push(newNetwork)
    return newNetwork
  }

  getNetworks() {
    return this.networks
  }

  getCurriculum() {
    return {
      profile: this.profile,
      education: this.education,
      networks: this.networks
    }
  }

  load(curriculum) {
    this.profile = curriculum.profile
    this.education = curriculum.education
    this.networks = curriculum.networks
  }

}