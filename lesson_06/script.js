'use strict';

function outerBot() {
    let mysteriousNumber = Math.floor(Math.random() * 100 + 1),
        count = 10;
    
    function innerBot() {
        let numberEntered = +prompt( 'Угадай число от 1 до 100', '' );

        if ( numberEntered == null || numberEntered == 'null' || numberEntered == '' ) {
            alert( 'К сожалению Вы решили покинуть игру :(' );
        } 
        else if ( count === 1 ) {
            numberEntered = confirm( 'Попытки закончились, хотите сыграть еще?' );
            if (numberEntered) {
                outerBot();
            } else {
                numberEntered === false;
            }
        }
        else {
            if ( numberEntered > mysteriousNumber ) {
                count--;
                alert( `Загаданное число меньше, осталось попыток: ${count}` );
                innerBot();
            } else if ( numberEntered < mysteriousNumber ) {
                count--;
                alert( `Загаданное число больше, осталось попыток: ${count}` );
                innerBot();
            } else if ( numberEntered === mysteriousNumber ) {
                numberEntered = confirm( 'Поздравляю, Вы угадали!!! Хотели бы сыграть еще?' );
                if (numberEntered) {
                    outerBot();
                } else {
                    numberEntered === false;
                }
            } else if ( String( numberEntered ) ) {
                alert( 'Введи число!' );
                innerBot();
            } else {
                return;
            }
        }
        
    }
    innerBot();
}
outerBot();