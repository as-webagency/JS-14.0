'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat( n )) && isFinite( n );
};

let money,
    income = 'Фриланс', // строка с дополнительными доходом (например: фриланс)
    addExpenses = prompt( 'Перечислите возможные расходы через запятую ', '' ), // перечисляем дополнительный расход 
    deposit = confirm( 'Есть ли у вас депозит в банке? ' ), // булево значение true/false
    mission = 50000, // любое число (Какую сумму хотите накопить)
    period = 3,// число от 1 до 12 (месяцев)
    expenses = []; 

let start = function () {
    do {
        money = prompt( 'Ваш месячный доход? ', '' );
    } while (!isNumber( money ));
};

start();

let showTypeOf = function ( data ) {
    console.log( data, typeof ( data ) ); 
};

showTypeOf( money );
showTypeOf( income );
showTypeOf( deposit );


// возвращает сумму всех обязательных расходов за месяц
let getExpensesMonth = function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt( 'Введите обязательную статью расходов? ', '' );
        sum += +prompt( 'Во сколько это обойдется? ', '' );
    }
    
    return sum;
};
let expensesAmount = getExpensesMonth();

// Вывод возможных расходов в виде массива (addExpenses)
//при нажатии на кнопку "Отмена", не будет выскакивать ошибка в консоли
if ( addExpenses ) {
    addExpenses.toLowerCase().split( ', ' );
    console.log( 'Длинна строки: ', addExpenses.length);
}

let getAccumulatedMonth = function () {
    return money - expensesAmount;
};

// результат вызова функции getAccumulatedMonth
let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function () {
    let target = mission / accumulatedMonth;

    if (target) {
        console.log( 'Цель будет достигнута: ', Math.floor(target) );
    } else {
        console.log( 'Цель не будет достигнута: ', Math.floor(-target) );
    }

    return Math.floor( target );
};

getTargetMonth();

let budgetDay = getAccumulatedMonth() / 30;

let getStatusIncome = function () {
    if ( budgetDay >= 1200 ) {
        return ( 'У вас высокий уровень дохода' );
    } else if ( budgetDay > 600 && budgetDay < 1200 ) {
        return ( 'У вас средний уровень дохода' );
    } else if ( budgetDay < 600 && budgetDay > 0 ) {
        return ( 'К сожалению у вас уровень дохода ниже среднего' );
    } else if ( budgetDay <= 0 || -budgetDay ) {
        return ( 'Что то пошло не так' );
    }
};

console.log( getStatusIncome() );
console.log( 'Бюджет на месяц: ', Math.ceil(budgetDay) );
console.log( 'Период равен ' + period + ' месяцев' );
console.log( 'Цель заработать ' + mission + ' рублей/долларов/гривен/юани' );