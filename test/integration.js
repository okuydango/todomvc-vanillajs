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

//assert what happens when we type enter
it('add new item to the list', function(){
	var driver = this.driver;
	return this.driver.findElement(webdriver.By.css('#new-todo'))
		.then(function(textInput) {
			//in order for the promise library to know what to do here, it needs to know- so "return"
			return textInput.sendKeys('clean Batmobile', webdriver.Key.ENTER); //same as ('clean', 'Batmoible');

		}).then(function(){  //this is a global object
			//Make sure that we are looking for the "only" one in the list and not the last one -- 
			//array should be only one and not adding more than one item
			return driver.findElements(webdriver.By.css('#todo-list li'));  
			//this.driver has issue... because it's out of scope
		}).then (function(items){
			assert.equal(items.length, 1);
			//items[0].getText(); //looks for the visible texts  
			//since this is "promise", so we CAN'T do 
			//var text = items[0].getText()
			//If nothing "bubble up", then moca will think test complete!!!

			return items[0].getText();
		}).then (function (thistext) {
			assert.equal(thistext, "clean Batmobile");
		});
	
});




