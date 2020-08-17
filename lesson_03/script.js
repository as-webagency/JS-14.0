'use strict';

let money = +prompt( 'Ваш месячный доход? ', '6000' ),
    income = 'фриланс',
    addExpenses = prompt( 'Перечислите возможные расходы за рассчитываемый период через запятую', 'интернет, такси, коммуналка' ),
    deposit = confirm( 'Есть ли у вас депозит в банке?' ),
    mission = 4000,
    period = 6,
    expenses1 = prompt( 'Введите обязательную статью расходов?', '' ),
    amount1 = prompt( 'Во сколько это обойдется?', '' ),
    expenses2 = prompt( 'Введите обязательную статью расходов?', '' ),
    amount2 = prompt( 'Во сколько это обойдется?', '' ),
    budgetMonth = money - amount1 - amount2,
    target = mission / budgetMonth,
    budgetDay = budgetMonth / 30;

if ( addExpenses ) {
    addExpenses.toLowerCase().split( ', ' );
}

if ( budgetDay >= 1200 ) {
    console.log( 'У вас высокий уровень дохода' );
} else if ( budgetDay > 600 && budgetDay < 1200 ) {
    console.log( 'У вас средний уровень дохода' );
} else if ( budgetDay < 600 && budgetDay > 0 ) {
    console.log( 'К сожалению у вас уровень дохода ниже среднего' );
} else if ( budgetDay <= 0 || -budgetDay ) {
    console.log( 'Что то пошло не так' );
}

if ( addExpenses ) {
    console.log( 'Длинна строки: ', addExpenses.length);
}
    
console.log( typeof money );
console.log( typeof income );
console.log( typeof deposit );

console.log( 'Месячный бюджет: ', budgetMonth );
console.log( 'За сколько месяцев будет достигнута цель: ', Math.floor(target) );
console.log( 'Бюджет на день: ', Math.ceil(budgetDay) );
console.log( 'Период равен ' + period + ' месяцев' );
console.log( 'Цель заработать ' + mission + ' рублей/долларов/гривен/юани' );