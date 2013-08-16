(function() {
	'use strict';

	function CSSClassRename(config) {
		this._config = config;
	}

	CSSClassRename.CLASSES = require('../assets/css-classes.json').CLASSES;

	CSSClassRename.prototype = {
		constructor: CSSClassRename,

		process: function(content) {
			CSSClassRename.PATTERNS.forEach(
				function(pattern) {
					content = content.replace(
						pattern.match, pattern.replace || '');
				}
			);

			return content;
		}
	};

	CSSClassRename.prepareRegExpReplace = function(className) {
		var regExp = new RegExp('(?:^|[\'" ])(' + className + ')(?:$|[\'" ])');

		return regExp;
	};

	CSSClassRename.replaceCSSClass = function(match) {
		var i,
			key,
			keys = Object.keys(CSSClassRename.CLASSES),
			regExp,
			originalMatch = match;

		for (i = 0; i < keys.length; ++i) {
			key = keys[i];

			regExp = CSSClassRename.prepareRegExpReplace(key);

			match = match.replace(regExp, CSSClassRename.CLASSES[key]);

			if (originalMatch !== match) {
				break;
			}
		}

		return match;
	};

	CSSClassRename.PATTERNS = [
		{
			desc: '.portlet-msg-alert',
			match: /(\.)([\w-]+)/g,
			replace: function(match, g1, g2) {
				return g1 + CSSClassRename.replaceCSSClass(g2);
			}
		},
		{
			desc: 'class=""',
			match: /((?:class|className|cssClass|iconClass)=["']\s*)([\w\s-]+)(\s*["'])/g,
			replace: function(match, g1, g2, g3) {
				return g1 + CSSClassRename.replaceCSSClass(g2) + g3;
			}
		},
		{
			desc: 'key: "aui-foo"',
			match: /([^'"]\w+[^'"A-Z]\s*\:\s*["']\s*)([\w\s-]+)(\s*["'])/g,
			replace: function(match, g1, g2, g3) {
				return g1 + CSSClassRename.replaceCSSClass(g2) + g3;
			}
		},
		{
			desc: 'variable = "aui-foo"',
			match: /([^'"]\w+[^'"]\s\=\s["']\s*)([\w\s-]+)(\s*["'])/g,
			replace: function(match, g1, g2, g3) {
				return g1 + CSSClassRename.replaceCSSClass(g2) + g3;
			}
		},
		{
			desc: 'add/removeClass',
			match: /(Class\(\s*["']\s*)([\w\s-]+)(\s*["'])/g,
			replace: function(match, g1, g2, g3) {
				return g1 + CSSClassRename.replaceCSSClass(g2) + g3;
			}
		}
	];

	module.exports.CSSClassRename = CSSClassRename;
}());