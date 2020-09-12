'use strict';

class First {

    hello() {
        console.log( 'Привет, я метод родителя!' );
    }

}

class Second extends First {

    hello() {
        super.hello();
        console.log( 'А я наследуемый метод!' );
    }

}

const classes1 = new First();
const classes2 = new Second();

classes1.hello();
classes2.hello();

console.log('classes1: ', classes1);
console.log('classes2: ', classes2);

/*
3) Нужно написать в Second метод hello, чтоб он сначала вызывал метод hello из First,
 а потом сразу печатал в консоль "А я наследуемый метод!"
*/