const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function add1(a) {
	return a + 1;
}

const allValues = [...values];
const allValuesPlus1 = allValues.map(add1);

for (let value of allValuesPlus1) {
	console.log(value);
}

const arrowFunc = () => 'hello arrows!';

const obj = { key: { moreKey: 123 } };
console.log(obj.key);
console.log(obj.key?.moreKey);
console.log(obj.key2?.moreKey);
console.log(obj.key?.moreKey2);

console.log(arrowFunc());
