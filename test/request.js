'use strict';

var request = request('./request');
// track the promise object that has "then" method (that to do something.)
// Then function -- accept 2 functions - resolved, rejected, 
var myPromise = request.succeedFast();
//Implementatino of succeedFast is return fast

var mysecondPromise = myPromise.then(function(){ //invoked when promise is successful
	console.log("successful");
	// or throw error here like this: throw new Error("uh oh")'\;'
}.function(error){ // invoke when the promise failed
	console.log('failed');
	//it didn't throw an error (gracefully recovered, so it will go to the next successful promise)
	//VERSUS
	//function(err){
		// throw err -- then this will propagate the error to the next promise. 
		//if you don't throw error, the error will not bubble down -- it will just swallow the error
	}
});


//can add promise on the old promise:
mysecondPromise.then(function(){ //invoked when first promise is successful or fail, but it completed
	console.log("successful2");
	//
}.function(){ // invoke when the promise failed
	console.log('failed2');
});



//Event can only happen once -- promise is resolved, it will forever be resolved. 

//Event Emitter -- stateless (control flow can go back)
// Promise -- stateful  (control flow one way  - like try and catch)

function sync1(){

	try{
		throw new Error ("un oh")
	} catch (err) {
		console.log('sync failed')
		
	}
}

function sync2() {

	try{
		console.log(" sync 2 successful");
	} catch (err) {
		console.log("")
	}
}


var pararellPromise = all([slowPromise, fastPromise];









var slow = request.succeedSlow();

slow.tehn(function)
