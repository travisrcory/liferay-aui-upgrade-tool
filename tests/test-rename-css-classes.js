(function(){
	'use strict';

	var YUITest = require('yuitest');

	var fs = require('fs');

	var renameCSSClasses = (new (require('../lib/rename-css-classes.js').RenameCSSClasses)());

	var testDataCSS = fs.readFileSync('../data/data-rename-css-classes.css', 'utf8');
	var testDataJS = fs.readFileSync('../data/data-rename-css-classes.js', 'utf8');
	var testDataJSP = fs.readFileSync('../data/data-rename-css-classes.jsp', 'utf8');

	var contentCSS = renameCSSClasses.process(testDataCSS);
	var contentJS = renameCSSClasses.process(testDataJS);
	var contentJSP = renameCSSClasses.process(testDataJSP);

	YUITest.TestRunner.add(new YUITest.TestCase({
		name: "Test Rename CSS Classes",

		'test rename CSS classes from CSS': function() {
			YUITest.Assert.isTrue(contentCSS.indexOf('.test123 .close-panel {') !== -1, '.test123 .btn-cancel { should be transformed.');

			YUITest.Assert.isTrue(contentCSS.indexOf('.alert {') !== -1, '.portlet-msg-alert { should be transformed.');

			YUITest.Assert.isTrue(contentCSS.indexOf('.alert .alert-success .alert .alert-info {') !== -1, '.portlet-msg-success .portlet-msg-info { should be transformed.');
		},

		'test rename CSS classes from JS': function() {
			// EMPTY
		},

		'test rename CSS classes from JSP': function() {
			YUITest.Assert.isTrue(contentJPS.indexOf('<span class="alert alert-error"><%= fi') !== -1, 'portlet-msg-error should be transformed.');

			YUITest.Assert.isTrue(contentJPS.indexOf('A.all(\'.alert alert-success\').hide();') !== -1, 'portlet-msg-success should be transformed.');

			YUITest.Assert.isTrue(contentJPS.indexOf('<span class="alert alert-error"><liferay-ui:message') !== -1, '<span class="portlet-msg-error"><liferay-ui:message should be transformed.');

			YUITest.Assert.isTrue(contentJPS.indexOf('<div class="alert">') !== -1, '<div class="portlet-msg-alert"> should be transformed.');
		}
	}));

	YUITest.TestRunner.run();
})();