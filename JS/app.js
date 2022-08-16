'use strict'

//-==CLOSURES==-
// let a = 1;
//
// function func() {
// 	console.log(b);
// }
// let b = 2;
//
// {
// 	let a = 5;
// 	func();
// 	console.log(func);
// }

// const arrA1 = [];
// const arrA2 = [];
//
// console.time('timer1');
// for (let i = 0; i < 100000; i++) {
// 	arrA1.push(i);
// }
// console.timeEnd('timer1');
//
// console.time('timer2');
// for (let i = 0; i < 100000; i++) {
// 	arrA2.unshift(i);
// }
// console.timeEnd('timer2');

// const person1 = {name: "Misha", age: 25, job: "Frontend"};
// const person2 = {name: "Tanya", age: 27, job: "JAVA"};
// const arrPer = [person1,person2];
// console.table(arrPer);

// num = 3;
// console.log(num);
// var num = 5;

// let func1 = function () {
// 	return this;
// }
//
// let func2 = () => {return this};
//
// let obj1 = {
// 	func3() {
// 		console.log(this);
// 		return func1();
// 	}
// }
//
// let obj2 = {
// 	students: ['John', 'Pete', 'Alice'],
// 	func5: () => this,
// 	func4() {
// 		console.log(this);
// 		return (() => {return this})();
// 		// return func2();
// 		// this.students.forEach(
// 		// 	val => console.log(this)
// 		// 	// function (val) {
// 		// 	// 	console.log(this)
// 		// 	// }
// 		// );
// 	}
// }
//
// // console.log(obj1.func3());
// // console.log(obj2.func4());
// console.log(obj2.func5());

//CLOSURES
// let phrase = "Hello";
// if (true) {
// 	let user = "John";
//
// 	function sayHi() {
// 		console.log(`${phrase}, ${user}`);
// 	}
// }
// sayHi();  //in strict mode sayHi is not defined!

// let num = 5;
// function returnNumFunc() {
// 	return num;
// }
// console.log(typeof(num));
// num = 7;
// if (true) {
// 	let num = 3;
// 	console.log(returnNumFunc());
// }

// function logPerson() {
// 	console.log(`Person: ${this.name}, ${this.age}, ${this.job}`);
// }
//
// function bind(context, fn) {
// 	return fn.apply(context);
// }
//
// const person1 = {name: 'Misha', age: 22, job: 'Frontend'};
//
// bind(person1, logPerson);

//===TASK 1===//
// let arr1 = [];
// for (let i = 0; i < 5; i++) {
// 	arr1[i] = Math.floor(Math.random() * 20) +  1;
// }
// console.log(arr1);
// let sum1 = arr1.filter((key) => key%2 === 0).reduce((prev, curr) => prev + curr ** 2, 0);
// console.log(sum1);
//

//===TASK 2===//
// function weirdFunction(start = 1, end = 10, divider = 3) {
// 	let number = Math.floor(start + Math.random() * (end - start)) + 1;
// 	console.log(number);
// 	console.log(!(number%divider) ? 'true' : 'false');
// }
//
// weirdFunction(5, 25, 3);

//===TASK 3===//
// function createPhoneNumber(numbers){
// 	return '('+numbers.join('').slice(0,3)+') '+numbers.join('').slice(3,6)+'-'+numbers.join('').slice(6);
// 	// return numbers.splice(0,0,'(').splice(3,0,') ').splice(7,0,'-').join('');
// }
//
// console.log(createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]));

//===TASK 4===//
// var countBits = function(n) {
// 	return n.toString(2).split('').reduce((sum,bit) => sum + +bit, 0);
// };
// var countBits = n => n.toString(2).split('0').join('').length;
//
// console.log(countBits(7));

// ===TASK 5===//
// function maskify(cc) {
// 	return cc.toString().replace(/(?=.{5})./g, '#');
// 	// return cc.toString().replace(/.(?=.{4})/g, '#');
// 	// return cc.toString().replace(/.(?=....)/g, '#');
// 	// return cc.toString().replace(/.(?=.{4,}$)/g, '#');
// }
//
// console.log(maskify('4556364607935616'));

// function bind(context, fn) {
// 	return function (...args){
// 		fn.apply(context, args)
// 	};
// }
//
// function logPerson() {
// 	console.log(`Person: ${this.name}, ${this.age}, ${this.job}`);
// }
//
// const person1 = {name: "Misha", age: 25, job: "Frontend"};
// const person2 = {name: "Tanya", age: 27, job: "JAVA"};
//
// bind(person1, logPerson)();
// bind(person2, logPerson)();

//===TASK 6===//
// function descendingOrder(n){
// 	if (n > 0) {
// 		return +(n.toString().split('').sort((a,b) => b-a).join(''));
// 	}
// }
//
// console.log(descendingOrder(12384739));

//===TASK 7===//
// function findEvenIndex(arr)
// {
// 	for (let i = 0; i < arr.length; i++) {
// 		if (arr.slice(0, i).reduce((acc, num) => acc + num, 0) === arr.slice(i + 1).reduce((acc, num) => acc + num, 0)) {
// 			return i;
// 		}
// 	}
// 	return -1;
// }
//
// console.log(findEvenIndex([10,-80,10,10,15,35,20]));

//===TASK 8===//
// function pigIt(str){
// 	return str.replace(/\b(\w)(\w*)\b/g, '$2$1ay');
// }
//
// console.log(pigIt('Pig latin is cool')); // igPay atinlay siay oolcay
// console.log(pigIt('Hello world !'));     // elloHay orldway !

//===TASK 9===//

// function humanReadable (seconds) {
// 	return Math.floor(seconds / 3600).toString().padStart(2, '0')
// 		+ ':' + Math.floor((seconds % 3600) / 60).toString().padStart(2, '0')
// 		+ ':' + (seconds % 60).toString().padStart(2, '0');
// }
//
// console.log(humanReadable(59));

//===TASK 10===//

// function digPow(n, p){
// 	let powArg = p;
// 	let sum = n.toString().split('').reduce((acc, val) => acc += val ** powArg++, 0);
// 	return sum % n === 0 ? sum / n : -1;
// }
//
// console.log(digPow(46288, 3));