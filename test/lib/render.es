
describe('MarkdownRender', function () {
  require('../../src')
  describe('register', function () {
    it('should register successfully', function () {
      hane.runtime.should.have.property('render')
      hane.runtime.render.name.should.be.eql('MarkdownRender')
    })
  })
  describe('feed', function () {
    it('should convert markdown to html', function (done) {
      hane.runtime.render.feed('# MarkdownRender Test')
        .then(result => {
          result.should.eql('<h1>MarkdownRender Test</h1>')
        })
        .catch(e => e.should.not.exists)
        .finally(done)
    })
  })
})
