
import Remarkable from 'remarkable'
import hljs from 'highlight.js'

if (!global.hane) {
  console.error('Please require in hanejs.')
  process.exit(1)
}

class MarkdownRender extends hane.Render {
  constructor() {
    super()
    this.name = 'MarkdownRender'

    const opts = {
      html: false,
      linkify: true,
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value
          } catch (err) {}
        }

        try {
          return hljs.highlightAuto(str).value
        } catch (err) {}

        // use external default escaping
        return ''
      },
      ...this.getConfig(),
    }

    const md = new Remarkable(opts)
    this.md = md
  }
  get validConfigFields() {
    return [ 'html', 'linkify' ]
  }
  feed(str) {
    return new Promise((resolve, reject) => {
      resolve(this.md.render(str))
    })
  }
}

hane.Render.register(MarkdownRender)
