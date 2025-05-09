/*
  Ejercicio 1: Reverse a String
  Escribe una función reverseString que tome una cadena como entrada y devuelva la cadena invertida.
*/

function reverseString(str) {
  return str.split('').reverse().join('');
}

/*
  Ejercicio 2: Check for Palindrome
  Escribe una función isPalindrome que tome una cadena como entrada 
  y devuelva true si la cadena es un palíndromo, y false en caso contrario.
*/
function isPalindrome(str) {
  const cleanStr = str.toLowerCase().replace(/\s+/g, '');
  return cleanStr === cleanStr.split('').reverse().join('');
}

/*
  Ejercicio 3: Find the Nearest Pair
  Dado un array de números enteros, 
  encuentra el par de elementos cuya diferencia es mínima. 
  En otras palabras, encuentra dos números en el array que 
  estén más cerca el uno del otro en términos de valor absoluto.

  Ejemplo:

  Entrada: [4, 2, 1, 7, 9, 10]
  Salida: [1, 2]w
*/

function closestPair(arr) {
  if (arr.length < 2) return [];

  arr.sort((a, b) => a - b);

  let minDiff = Infinity;
  let result = [];

  for (let i = 0; i < arr.length - 1; i++) {
    const diff = arr[i + 1] - arr[i]; 
    if (diff < minDiff) {
      minDiff = diff; 
      result = [arr[i], arr[i + 1]];
    }
  }

  return result;

}


/*
  Ejercicio 4: Calculadora - Programación Orientada a Objetos
  La calculadora debe ser capaz de realizar operaciones aritméticas básicas, 
  como suma, resta, multiplicación y división. 
  Además, debe mantener un registro del último resultado calculado 
  para que los usuarios puedan acceder a él si es necesario.

  La calculadora debe ser una clase llamada Calculator, que tenga los siguientes métodos:
  - add(a, b): Este método toma dos números como argumentos y devuelve la suma de los mismos. 
    Además, actualiza el último resultado calculado.

  - subtract(a, b): Este método toma dos números como argumentos y devuelve la resta del primero menos el segundo. 
    Además, actualiza el último resultado calculado.

  - multiply(a, b): Este método toma dos números como argumentos y devuelve el producto de los mismos. 
    Además, actualiza el último resultado calculado.

  - divide(a, b): Este método toma dos números como argumentos y devuelve el cociente del primero dividido por el segundo.
    Si el segundo número es cero, se debe lanzar un error indicando que la división por cero no está permitida. 
    Además, actualiza el último resultado calculado.

  - getLastResult(): Este método devuelve el último resultado calculado por la calculadora, simulando un historial.

  Además de estos métodos, debes agregar una función más compleja a la clase Calculator, 
  que calcule la potencia de un número. 
  Esta función debe ser asignada al prototipo de la clase y se llamará exponentiate(base, exponent). 
  Esta función toma dos argumentos: la base y el exponente, y devuelve la base elevada a la potencia del exponente. 
  La función debe manejar correctamente los casos donde el exponente es cero o negativo, lanzando un error en este último caso.
  Además, actualiza el último resultado calculado.

*/

class Calculator {
  constructor() {
    this._lastResult = 0;

  }

  add(a, b) {
    const result = a + b;
    this._lastResult = result;
    return result;
  }

  subtract(a, b) {
    const result = a - b;
    this._lastResult = result;
    return result;
  }

  multiply(a, b) {
    const result = a * b;
    this._lastResult = result;
    return result;
  }

  divide(a, b) {
    if(b === 0) {
      throw new Error("Division by zero is not allowed")
    }
    const result = a / b;
    this._lastResult = result;
    return result;
  }

  getLastResult(){
    return this._lastResult;
  }

}

Calculator.prototype.exponentiate = function(base, exponent){
  if(exponent < 0){
    throw Error("Exponentiation with negative exponent is not allowed")
  }

  const result = Math.pow(base, exponent);
  this._lastResult = result;
  return result;
}


module.exports = {
  closestPair,
  isPalindrome,
  reverseString,
  Calculator,
}