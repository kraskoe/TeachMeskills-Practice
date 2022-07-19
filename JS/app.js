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

//===TASK 5===//
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
