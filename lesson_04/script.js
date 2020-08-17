'use strict';

let money = +prompt( 'Ваш месячный доход? ', '6000' ), // Доход за месяц
    income = prompt( 'Дополнительный доход ', 'фриланс' ), // строка с дополнительными доходом (например: фриланс)
    addExpenses = prompt( 'Перечислите возможные расходы за рассчитываемый период через запятую ', '' ), // перечисляем дополнительный расход 
    deposit = confirm( 'Есть ли у вас депозит в банке? ' ), // булево значение true/false
    mission = +prompt( 'Какую сумму хотите накопить? ', '' ), // любое число (Какую сумму хотите накопить)
    period = 6, // число от 1 до 12 (месяцев)
    expenses1 = prompt( 'Введите обязательную статью расходов? ', '' ),
    amount1 = +prompt( 'Во сколько это обойдется? ', '' ),
    expenses2 = prompt( 'Введите обязательную статью расходов? ', '' ),
    amount2 = +prompt( 'Во сколько это обойдется? ', '' );

let showTypeOf = function ( data ) {
    console.log( data, typeof ( data ) ); 
};

showTypeOf( money );
showTypeOf( income );
showTypeOf( deposit );

// Функция getExpensesMonth возвращает сумму всех обязательных расходов за месяц
let getExpensesMonth = function () {
    return amount1 + amount2;
};

// Вывод возможных расходов в виде массива (addExpenses)
//при нажатии на кнопку "Отмена", не будет выскакивать ошибка в консоли
if ( addExpenses ) {
    addExpenses.toLowerCase().split( ', ' );
    console.log( 'Длинна строки: ', addExpenses);
}

// Функция getAccumulatedMonth возвращает Накопления за месяц (Доходы минус расходы)
let getAccumulatedMonth = function () {
    return money - getExpensesMonth();
};

// Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth 
let accumulatedMonth = getAccumulatedMonth();

/* Функция getTargetMonth подсчитывает за какой период будет достигнута цель, 
   зная результат месячного накопления (accumulatedMonth) и возвращает результат*/
let getTargetMonth = function () {
    let target = mission / accumulatedMonth;
    console.log( 'За сколько месяцев будет достигнута цель: ', Math.floor(target) );
    return Math.floor( target );
};

getTargetMonth();

// budgetDay высчитываем исходя из значения месячного накопления (accumulatedMonth)
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