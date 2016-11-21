'use strict';

var _remarkable = require('remarkable');

var _remarkable2 = _interopRequireDefault(_remarkable);

var _highlight = require('highlight.js');

var _highlight2 = _interopRequireDefault(_highlight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!global.hane) {
  console.error('Please require in hanejs.');
  process.exit(1);
}

const validConfigFields = ['html', 'linkify'];

class MarkdownRender extends hane.Render {
  constructor() {
    super();
    this.name = 'MarkdownRender';
    const opts = {
      html: false,
      linkify: true,
      highlight: function (str, lang) {
        if (lang && _highlight2.default.getLanguage(lang)) {
          try {
            return _highlight2.default.highlight(lang, str).value;
          } catch (err) {}
        }

        try {
          return _highlight2.default.highlightAuto(str).value;
        } catch (err) {}

        // use external default escaping
        return '';
      }
    };
    // overwritten by user config
    for (let k of validConfigFields) {
      if (k in this.config) {
        opts[k] = this.config[k];
      }
    }
    const md = new _remarkable2.default(opts);
    this.md = md;
  }
  feed(str) {
    return new Promise((resolve, reject) => {
      resolve(this.md.render(str));
    });
  }
}

hane.Render.register(MarkdownRender);

