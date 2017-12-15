describe("CV Builder", () => {
  const Curriculum = require('./../../lib/cvutils/Curriculum')
  const Profile = require('./../../lib/cvutils/Profile')
  const Education = require('./../../lib/cvutils/Education')
  let curriculum, profile
  
  describe('profile', () => {
    beforeEach(() => {
      curriculum = new Curriculum()
      profile = new Profile('Jesus Guerrero', 'Web Developer','Always learning developing and mastering', 'jesusant.guerrero@gmail.com', '829-844-1674')
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
      educationItem =  new Education('Bachiller Tecnico', 'Lilian Bayona', 2011, 2013, 5.0)
    })

    it('should add a new education item', () => {
      curriculum.addEducation(educationItem)
      expect(curriculum.getEducation()[0]).toBe(educationItem)
    })

    it('should delete the education item by index', () => {
      curriculum.deleteEducation(0)
      expect(curriculum.getEducation().length).toBe(0)
    })
  })

  describe('networks', () => {
    it('should add a new network to the profile', () => {
      const github = curriculum.addNetwork('github', 'gh', 'https://github.com/jesusantguerrero')
      const twitter = curriculum.addNetwork('twitter', 't', 'https://twitter.com/jesusntguerrero')

      expect(curriculum.getNetworks().toString()).toBe([github, twitter].toString())
    })
  })

  describe('skills', () => {
    let js 
    beforeEach(() => {
      js = curriculum.addSkill('javascript', 'expert')
    })

    it('should add a new skill to the cv', () => {
      const php = curriculum.addSkill('php', 'medium')
      expect(JSON.stringify(curriculum.getSkills('profesional'))).toBe(JSON.stringify([js, php]))
    })
    
    it('should delete a skill by index', () => {
      expect(JSON.stringify(curriculum.deleteSkill(0, 'profesional'))).toBe(JSON.stringify([js]))
    })
  })
})
