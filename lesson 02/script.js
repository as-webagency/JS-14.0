'use strict';

let money = 6000,
    income = 'фриланс',
    addExpenses = 'интернет, такси, коммуналка',
    deposit = false,
    mission = 4000,
    period = 6,
    budgetDay = money / 30;

    addExpenses.toLowerCase().split( ', ' );
    
console.log( typeof money );
console.log( typeof income );
console.log( typeof deposit );
console.log( addExpenses.length );
console.log( 'Период равен ' + period + ' месяцев' );
console.log( 'Цель заработать ' + mission + ' рублей/долларов/гривен/юани' );
console.log("Дневной бюджет: ", budgetDay);
console.log("addExpenses: ", addExpenses);