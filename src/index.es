
import Remarkable from 'remarkable'
import hljs from 'highlight.js'

if (!global.hane) {
  console.error('Please require in hanejs.')
  process.exit(1)
}

const validConfigFields = [ 'html', 'linkify' ]

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
    }
    // overwritten by user config
    for (let k of validConfigFields) {
      if (k in this.config) {
        opts[k] = this.config[k]
      }
    }
    const md = new Remarkable(opts)
    this.md = md
  }
  feed(str) {
    return new Promise((resolve, reject) => {
      resolve(this.md.render(str))
    })
  }
}

hane.Render.register(MarkdownRender)
