'use strict';

let isNumber = function ( n ) {
    return !isNaN( parseFloat( n ) ) && isFinite( n );
};

let money, // Доход за месяц
    start = function () {

    do {
        money = prompt( 'Ваш месячный доход?' );
    } while ( !isNumber( money ) );

};
start();

let appData = {
    budget: money,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 3,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    // Спрашиваем пользователя 
    asking: function () {

        let addExpenses = prompt( 'Перечислите возможные расходы за рассчитываемый период через запятую', 
            'Интернет, Такси, Коммуналка' ); // Перечисление дополнительных расходов
            // Разбить строку на массив
            if ( addExpenses ) {
                appData.addExpenses = addExpenses.toLowerCase().split(', ');
            }
            appData.deposit = confirm( 'Есть ли у вас депозит в банке?' ); // Булево значение

        // Функция возвращает сумму всех обязательных расходов за месяц
        for (let i = 0; i < 2; i++) {
            
            let expensesItem = prompt( 'Введите обязательную статью расходов?', '' ),
                expensesCost = +prompt( 'Во сколько это обойдется?', '' );

            if ( ( typeof (expensesItem) ) === 'string' && expensesItem !== null && expensesItem !== '' && 
                expensesCost !== '' && expensesCost !== null ) {
                appData.expenses[expensesItem] = expensesCost;
            } else {
                i = i - 1;
            }
    
        }

    },
    // Функция возвращает сумму всех обязательных расходов за месяц
    getExpensesMonth: function () {

        for (let key in appData.expenses) {
            appData.expensesMonth += appData.expenses[key];
        }
    
    },
    // Функция возвращает Накопления за месяц (Доходы минус расходы)
    getBudget: function () {

        appData.budgetMonth = Math.floor( money - appData.budgetMonth );
        appData.budgetDay = appData.budgetMonth / 30;
        return money - appData.expensesMonth;

    },
    // Объявить функцию getTargetMonth. Подсчитывает за какой период будет достигнута цель, 
    // зная результат месячного накопления (accumulatedMonth) и возвращает результат
    getTargetMonth: function () {
        
        let target = appData.mission / appData.accumulatedMonth;
        target = Math.floor(target);

        if ( target > 0 || -target ) {
            return ( 'Цель будет достигнута за ' + target + ' месяцев');
        } else {
            return ( 'Цель не будет достигнута' );
        }

    },
    // Конструкция условий
    getStatusIncome: function () {

        if ( appData.budgetDay > 1200 ) {
            // Если budgetDay больше 1200, то “У вас высокий уровень дохода”
            return ( 'У вас высокий уровень дохода' );
        } else if ( appData.budgetDay > 600 && appData.budgetDay < 1200 ) {
            // Если budgetDay больше 600 и меньше 1200, то сообщение “У вас средний уровень дохода”
            return ( 'У вас средний уровень дохода' );
        } else if ( appData.budgetDay < 600 && appData.budgetDay > 0 ) {
            // Если budgetDay меньше 600 то в консоль вывести сообщение “К сожалению у вас уровень дохода ниже среднего”
            return ( 'К сожалению у вас уровень дохода ниже среднего' );
        } else if ( appData.budgetDay <= 0 || -appData.budgetDay ) {
            // Если отрицательное значение то вывести “Что то пошло не так”
            return ( 'Что то пошло не так' );
        }

    },
};

// Вызовы функции 
appData.asking();
let expensesMonth = appData.getExpensesMonth(),
    accumulatedMonth = appData.getBudget(),
    targetMonth = appData.getTargetMonth();
appData.getStatusIncome();

// Вывод консоли
console.log( 'Расходы за месяц: ', appData.expensesMonth );
console.log( targetMonth );
console.log( appData.getStatusIncome() );

// Вывести все свойства и значения для объекта appData
for (let key in appData) {
    console.log( 'Наша программа ' + key + ' включает в себя данные: ' + appData[key] );
}