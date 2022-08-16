'use strict'

//-==TASK 1==-

function range(arg1, arg2) {
	if (typeof +arg1 != 'number' || typeof +arg2 != 'number') {
		return;
	}
	let arr = [];
	for (let i = +arg1; i <= +arg2; i++) {
		arr.push(i);
	}
	return arr;
}

function sum(arr) {
	if (Array.isArray(arr)) {
		return arr.reduce((acc, val) => acc + val, 0);
	}
}

console.log('-==TASK 1==-')
console.log(range(5, 13));
console.log(sum([5,8,2]));


//-==TASK 2==-
console.log('-==TASK 2==-')

function isUpperCase(str, character) {
	if (str.charCodeAt(character) === str.toUpperCase().charCodeAt(character)) {
		return true;
	} else return false;
}

console.log(isUpperCase('Hello',0));

//-==TASK 3==-
console.log('-==TASK 3==-')

function sumOfNumbers(num) {
	if (!Number.isInteger(num) && num < 0) {
		return false;
	} else {
		return num.toString().split('').reduce((acc, val) => +acc + +val);
	}
}

console.log(sumOfNumbers(Math.floor(Math.random() * 1_000_000) + 1));
console.log(sumOfNumbers(55555));

//-==TASK 4==-
console.log('-==TASK 4==-')

function drawChessBoard() {
	for (let i = 0; i < 8; i++) {
		let str = '';
		for (let j = 0; j < 8; j++) {
			if (i % 2) {
				if (!(j % 2)) {
					str += 'X';
				} else str += ' ';
			} else {
				if ((j % 2)) {
					str += 'X';
				} else str += ' ';
			}
		}
		console.log(str);
	}
}

drawChessBoard();

//-==TASK 5==-
console.log('-==TASK 5==-')

function returnAverageFromArray(arr) {
	return arr.reduce((acc, val) => acc + val, 0) / arr.length;
}

console.log(returnAverageFromArray([5, 8, 10, 3, 15]));

//-==TASK 6==-
console.log('-==TASK 6==-')

function calculateSquareAndPerimeter(type, size1, size2 = size1, size3 = size1) {
	let figure = {};
	switch (type) {
		case 'square':
			figure.perimeter = size1 * 4;
			figure.square = size1 ** 2;
			return figure;
		case 'circle':
			figure.perimeter = 2 * Math.PI * size1;
			figure.square = Math.PI * size1 ** 2;
			return figure;
		case 'triangle':
			figure.perimeter = size1 + size2 + size3;
			figure.square = Math.sqrt(figure.perimeter / 2 * (figure.perimeter / 2 - size1) * (figure.perimeter / 2 - size2) * (figure.perimeter / 2 - size3));
			return figure;
		case 'rectangle':
			figure.perimeter = (size1 + size2) * 2;
			figure.square = size1 * size2;
			return figure;
		default:
			return figure;
	}
}

let square = calculateSquareAndPerimeter('square', 5),
	circle = calculateSquareAndPerimeter('circle', 5),
	triangle = calculateSquareAndPerimeter('triangle', 3, 4, 5),
	rectangle = calculateSquareAndPerimeter('rectangle', 3, 4);

console.log(`Square: ${square.square}, perimeter: ${square.perimeter}`);
console.log(`Square: ${circle.square}, perimeter: ${circle.perimeter}`);
console.log(`Square: ${triangle.square}, perimeter: ${triangle.perimeter}`);
console.log(`Square: ${rectangle.square}, perimeter: ${rectangle.perimeter}`);

//-==TASK 7==-
console.log('-==TASK 7==-')

function returnExtraSpaces(str) {
	// return str.match(/\s\s/g).length; // Считает все пробельные символы
	return str.match(/  /g).length;
}

console.log(returnExtraSpaces('Написать  программу, которая выводит  количество лишних  пробелов в  строке.'));

//-==TASK 8==-
console.log('-==TASK 8==-')

function createObjectArray(arr) {
	return arr.map(val => ({'value': val}));
}

console.log(createObjectArray([5, 3, 4, 10]));

//-==TASK 9==-
console.log('-==TASK 9==-')

function bind(fn) {
	return function (context) {
		return fn.call(context);
	}
}

function someFunc() {
	return this.name;
}

let someObjForSomeFunc = {
	name: 'someName'
}

let boundFunc = bind(someFunc);
console.log(boundFunc(someObjForSomeFunc));

//-==TASK 10==-
console.log('-==TASK 10==-')

let arr1 = [1, 2, 3],
	arr2 = [4, 5, 6, 7];

function createMixedArray(arr1, arr2) {
	let arr = [];
	for (let i = 0; i < Math.min(arr1.length, arr2.length); i++) {
		arr.push(arr1[i]);
		arr.push(arr2[i]);
	}
	if (arr1.length !== arr2.length) {
		if (arr1.length > arr2.length) {
			for (let i = arr.length / 2; i < arr1.length; i++) {
				arr.push(arr1[i]);
			}
		} else {
				for (let i = arr.length / 2; i < arr2.length; i++) {
					arr.push(arr2[i]);
			}
		}
	}
		return arr;
}

console.log(createMixedArray(arr1, arr2));

//-==TASK 11==-
console.log('-==TASK 11==-')

Number.prototype.plus = function (op) {
	return this + op;
}
Number.prototype.minus = function (op) {
	return this - op;
}

console.log((2).plus(3).minus(1));

//-==TASK 12==-
console.log('-==TASK 12==-')

function carryingFn(arg1, arg2) {
	if (arg2!== undefined) {
		return arg1 + arg2;
	} else {
		return function (arg2) {
			return arg1 + arg2;
		}
	}
}

console.log(carryingFn(2,3));
console.log(carryingFn(2)(3));

//-==TASK 13==-
console.log('-==TASK 13==-')

function numFizzBuzz(n) {
	for (let i = 1; i <= n; i++) {
		switch (true) {
			case !(i % 3) && !(i % 5) :
				console.log('fizzbuzz');
				break;
			case !(i % 3):
				console.log('fizz');
				break;
			case !(i % 5) :
				console.log('buzz');
				break;
			default:
				console.log(i);
		}
	}
}

numFizzBuzz(15);

//-==TASK 14==-
console.log('-==TASK 14==-')

function countVowels(str) {
	return str.match(/[aeiou]/gi).length;
}

console.log(countVowels('hellO'));

//-==TASK 15==-
console.log('-==TASK 15==-')

var tree = {
	valueNode: 3,
	next: [{
			valueNode: 1,
		next: {
			valueNode: 2,
			next: null
			},
		},
		{
			valueNode: 3,
			next: null
		},
		{
			valueNode: 2,
			next: null
		},
		{
			valueNode: 2,
			next: [
				{
					valueNode: 1,
					next: null
				},
				{
					valueNode: 5,
					next: null
				}
			]
		}]
};

let counter = 0;
function calculateVertexes(obj) {
	if (Array.isArray(obj)) {
		for (let o of obj) {
			calculateVertexes(o);
		}
		return;
	}
	if (obj.next)	{
		calculateVertexes(obj.next);
	} else counter += obj.valueNode;
}

calculateVertexes(tree);
console.log(counter);