'use strict';

// 1 вариант
let num = 266219;
num = num.toString().split( '' );
let result = num.reduce(( total, sum ) =>  {
    return total *= sum;
});
result **= 3;

console.log( result );
console.log( "Результат возведения в степень 3 методом reduce: ", result );
console.log( "Вывести на экран первые 2 цифры полученного числа: ", String( result ).slice(0, 2) );

// 2 вариант
let num2 = 266219,
    str = num2 + '',
    sum = 1;

    for (let i = 0; i < str.length; i++) {
        sum *= str[i];
    }

    sum **= 3;

console.log( sum );
console.log( "Результат возведения в степень 3 циклом for: ", sum );
console.log( "Вывести на экран первые 2 цифры полученного числа: ", String( sum ).slice(0, 2) );

// 3 вариант
let num3 = 266219,
    str2 = num3 + '',
    sum2 = 1,
    arr = str2.split( '' );

    arr.forEach( item => {
        sum2 *= item;
    });

    sum2 **= 3;

console.log (sum2 );
console.log( "Результат возведения в степень 3 циклом forEach: ", sum2 );
console.log( "Вывести на экран первые 2 цифры полученного числа: ", String( sum2 ).slice(0, 2) );

// 4 вариант
let num4 = 266219,
    str3 = num4 + '',
    arr2 = str3.split( '' ),
    sum3 = arr2.reduce(function ( acc, item ) {  
        return acc * item; 
    }, 1);

    sum3 **= 3;

console.log ( sum3 );
console.log( "Результат возведения в степень 3 методом reduce: ", sum3 );
console.log( "Вывести на экран первые 2 цифры полученного числа: ", String( sum3 ).slice(0, 2) );

// 5 вариант
let num5 = 266219,
    str4 = num5 + '',
    arr3 = str4.split( '' ),
    sum4 = arr3.reduce(function ( acc, item ) {  
        return +item ? acc * item : acc; 
    }, 1);

    sum4 **= 3;

console.log ( sum4 );
console.log( "Результат возведения в степень 3 методом reduce + тернарным оператором: ", sum4 );
console.log( "Вывести на экран первые 2 цифры полученного числа: ", String( sum4 ).slice(0, 2) );