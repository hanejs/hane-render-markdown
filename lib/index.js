'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _remarkable = require('remarkable');

var _remarkable2 = _interopRequireDefault(_remarkable);

var _highlight = require('highlight.js');

var _highlight2 = _interopRequireDefault(_highlight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!global.hane) {
  console.error('Please require in hanejs.');
  process.exit(1);
}

class MarkdownRender extends hane.Render {
  constructor() {
    super();
    this.name = 'MarkdownRender';

    const opts = _extends({
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
    }, this.getConfig());

    const md = new _remarkable2.default(opts);
    this.md = md;
  }
  get validConfigFields() {
    return ['html', 'linkify'];
  }
  feed(str) {
    return new Promise((resolve, reject) => {
      resolve(this.md.render(str));
    });
  }
}

hane.Render.register(MarkdownRender);

