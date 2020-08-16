'use strict';

let money = +prompt( 'Ваш месячный доход? ', '6000' ), // Доход за месяц
    income = prompt( 'Дополнительный доход ', 'фриланс' ), // строка с дополнительными доходом (например: фриланс)
    addExpenses = prompt( 'Перечислите возможные расходы за рассчитываемый период через запятую ', '' ), // перечисляем дополнительный расход 
    deposit = confirm( 'Есть ли у вас депозит в банке? ' ), // булево значение true/false
    mission = +prompt( 'Какую сумму хотите накопить? ', '' ), // любое число (Какую сумму хотите накопить)
    period = +prompt( 'Период (от 1 до 12 месяцев) ', '' ), // число от 1 до 12 (месяцев)
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

// возвращает сумму всех обязательных расходов за месяц
let getExpensesMonth = function () {
    let budgetMonth = money - amount1 - amount2;
    console.log( 'Месячный бюджет: ', budgetMonth );
    return budgetMonth;
};

// Вывод возможных расходов в виде массива (addExpenses)
//при нажатии на кнопку "Отмена", не будет выскакивать ошибка в консоли
if ( addExpenses ) {
    addExpenses.toLowerCase().split( ', ' );
    console.log( 'Длинна строки: ', addExpenses.length);
}

let getAccumulatedMonth = function () {
    return money - getExpensesMonth();
};

// результат вызова функции getAccumulatedMonth
let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function () {
    let target = mission / accumulatedMonth;
    console.log( 'За сколько месяцев будет достигнута цель: ', Math.floor(target) );
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