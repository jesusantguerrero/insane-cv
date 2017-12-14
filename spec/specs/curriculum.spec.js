describe("CV Builder", () => {

  it('should set basic person data', () => {
    const Curriculum = require('./../../lib/cvutils/Curriculum')
    const curriculum = new Curriculum()
    const profile = new profile()

    curriculum.setProfile(profile)
    expect(curriculum.getProfile()).toBe(profile)
  })
})
