describe("CV Builder", () => {
  const Curriculum = require('./../../lib/cvutils/Curriculum')
  const Profile = require('./../../lib/cvutils/Profile')
  const Education = require('./../../lib/cvutils/Education')
  const Network = require('./../../lib/cvutils/Network')
  const Skills = require('./../../lib/cvutils/Skills')
  const Experience = require('./../../lib/cvutils/Experience')
  let curriculum, profile
  
  describe('profile', () => {
    beforeEach(() => {
      curriculum = new Curriculum()
      profile = Profile.create('Jesus Guerrero', 'Web Developer','Always learning developing and mastering', 'jesusant.guerrero@gmail.com', '829-844-1674')
    })
  
    it('should set basic person data', () => {
      curriculum.setProfile(profile)
      expect(curriculum.getProfile()).toBe(profile)
    })
  
    it('should empty the profile', () => {
      curriculum.emptyProfile()
      expect(curriculum.getProfile()).toBe(null)
    })
  })

  describe('Education', () => {
    let educationItem 

    beforeEach(() => {
      educationItem =  Education.create('Bachiller Tecnico', 'Lilian Bayona', 2011, 2013, 5.0)
    })
    
    it('should add a new education item', () => {
      curriculum.addEducation(educationItem)
      expect(curriculum.getEducation()[0]).toBe(educationItem)
    })
    
    it('should edit a education item', () => {
      const secondItem = Education.create('Bachiller Tecnico', 'Lilian Bayona', 2011, 2013, 3.0)
      curriculum.editEducation(secondItem, 0)
      expect(curriculum.getEducation()[0]).toBe(secondItem)
    })

    it('should delete the education item by degree', () => {
      curriculum.deleteEducation()
      expect(curriculum.getEducation('Bachiller Tecnico').length).toBe(0)
    })
  })

  describe('networks', () => {
    let github, twitter

    beforeEach(() => {
      github = Network.create('github', 'gh', 'https://github.com/jesusantguerrero')
      twitter = Network.create('twitter', 't', 'https://twitter.com/jesusntguerrero')
      curriculum.addNetwork(github)
    })

    it('should add a new network to the profile', () => {
      curriculum.addNetwork(twitter)
      expect(JSON.stringify(curriculum.getNetworks())).toBe(JSON.stringify([github, twitter]))
    })

    it('should delete a network item', () =>{
      const deleted = curriculum.deleteNetwork(0)

      expect(JSON.stringify(deleted)).toBe(JSON.stringify([github]))
    })
  })

  describe('skills', () => {
    let js 
    beforeEach(() => {
      js = Skills.create('javascript', 'expert')
    })

    it('should add a new skill to the cv', () => {
      const php = Skills.create('php', 'medium')
      curriculum.addSkill(js)
      curriculum.addSkill(php)
      expect(JSON.stringify(curriculum.getSkills())).toBe(JSON.stringify([js, php]))
    })
    
    it('should delete a skill by index', () => {
      expect(JSON.stringify(curriculum.deleteSkill(0))).toBe(JSON.stringify([js]))
    })
  })

  describe('experience', () =>{
    let ics
    beforeEach(() => {
      ics = Experience.create('Web Developer', 'IC. Services','La Romana, RD','07-2017','11-2017', 'cosas desarrolladas', ['cosa una', 'cosa2'])
      curriculum.addExperience(ics)
    })

    it('should add a new experience', () => {
      expect(JSON.stringify(curriculum.getExperience()[0])).toBe(JSON.stringify(ics))
    })

    it('should delete a experience by index', () => {
      expect(JSON.stringify(curriculum.deleteExperience(0))).toBe(JSON.stringify([ics]))
    })
  })
})
