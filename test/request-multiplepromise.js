'use strict';

var request = request('./request');
// track the promise object that has "then" method (that to do something.)
// Then function -- accept 2 functions - resolved, rejected, 
var myPromise = request.succeedFast();
//Implementatino of succeedFast is return fast
//
console.log(typeof myPromise);
console.log(typeof myPromise.then)


myPromise.then(function(){ //invoked when promise is successful
	console.log("successful");
}.function(){ // invoke when the promise failed
	console.log('failed');
});


// you can add more to this same object
myPromise.then(function(){ //invoked when promise is successful
	console.log("successful2");
}.function(){ // invoke when the promise failed
	console.log('failed2');
});

setTimeout(function(){
	console.log("attached another promise here");
	// you can add more to this same object
	myPromise.then(function(){ //invoked when promise is successful
		console.log("successful2");
	}.function(){ // invoke when the promise failed
		console.log('failed2');
	});
}, 5000);



//Event can only happen once -- promise is resolved, it will forever be resolved. 

//Event Emitter -- stateless
// Promise -- stateful 