'use strict';

var assert = require('assert');

var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var chromeDriver = require('selenium-chromedriver');

var port = process.env.NODE_TEST_PORT || 8002;

before(function(done) {
  require('./server')(__dirname + '/..', port, done);
  chrome.setDefaultService(
    new chrome.ServiceBuilder(chromeDriver.path).build()
  );
});

// can use global variable...  var driver;
// OR Add as mocha's context this.driver.
beforeEach(function(){
	//copy and paste from wiki
	//var driver = new webdriver.Builder().

	this.driver = new webdriver.Builder().
		withCapabilities(webdriver.Capabilities.chrome()).
		build();

	return this.driver.get('http://localhost:' + port);
});

afterEach(function(){
	//can't find the driver?
	//driver.quit();
	return this.driver.quit();
});

//it('contains the application name in the page title', function(done){  //don't use done here
it('contains the application name in the page title', function(){

	this.timeout(6000);
	//var headLocator = webdriver.By.css('head title');
	//if we don't return anything, then other parts of the code doesn't know what is going on
	
	//return this.driver.findElement(headLocator).then(function(element) {
	return this.driver.getTitle().then(function(titleText){
	//	return element.getText();
	//}).then(function(text){
		//assert(text === 'TodoMVC');
		//assert.equal(text, 'VanillaJS • TodoMVC');
		//assert.equal(titleText, 'TodoMVC');
		assert(/TodoMVC/.test(titleText));
	});
	//setTimeout(done, 5000);
});