
describe('hane', function () {
  it('should has hane', function () {
    global.should.have.property('hane')
  })
  it('should has config', function () {
    hane.should.have.property('config')
  })
  it('should has Render', function () {
    hane.should.have.property('Render')
  })
  describe('Render', function () {
    it('should has empty config', function () {
      const r = new hane.Render()
      r.should.have.property('getConfig')
      r.getConfig().should.be.empty()
    })
  })
})
