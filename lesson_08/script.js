'use strict';

let isNumber = function ( n ) {
    return !isNaN( parseFloat( n ) ) && isFinite( n );
};

let money, // Доход за месяц
    start = function () {

    do {
        money = prompt( 'Ваш месячный доход?', 50000 );
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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 50000,
    period: 3,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    // Спрашиваем пользователя 
    asking: function () {

        if ( confirm( 'Есть ли у вас дополнительный источник заработка?' ) ) {
            let itemIncome, cashIncome;

            do {
                itemIncome = prompt( 'Какой у вас дополнительный заработок?', 'Такси' );
            } while ( !isNaN( itemIncome ) || itemIncome === '' || itemIncome === null );

            do {
                cashIncome = prompt( 'Сколько в месяц вы на этом зарабатываете?', 10000 );
            } while ( isNaN( cashIncome ) || cashIncome === '' || cashIncome === null );

            appData.income[itemIncome] = cashIncome;

        }

        let addExpenses = prompt( 'Перечислите возможные расходы за рассчитываемый период через запятую', 
            'интернет, такси, коммуналка' ); // Перечисление дополнительных расходов
            // Каждое слово с большой буквы, слова разделены запятой и пробелом
            if ( addExpenses ) {
                appData.addExpenses = addExpenses.split( /\s+/ ).map( word => word[0].toUpperCase() + 
                word.substring( 1 )).join(' ');
                console.log('appData.addExpenses: ', appData.addExpenses);
            }
            appData.deposit = confirm( 'Есть ли у вас депозит в банке?' ); // Булево значение

        // Функция возвращает сумму всех обязательных расходов за месяц
        for (let i = 0; i < 2; i++) {
            let expensesItem, expensesCost;

            do {
                expensesItem = prompt( 'Введите обязательную статью расходов?', '' );
            } while ( !isNaN( expensesItem ) || expensesItem === '' || expensesItem === null );

            do {
                expensesCost = prompt( 'Во сколько это обойдется?', 2500 );
            } while ( isNaN( expensesCost ) || expensesCost === '' || expensesCost === null );

            appData.expenses[expensesItem] = expensesCost;
        }

    },
    // Функция возвращает сумму всех обязательных расходов за месяц
    getExpensesMonth: function () {

        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
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
    // Есть ли депозит в банке
    getInfoDeposit: function () {

        if ( appData.deposit ) {
            do {
                appData.percentDeposit = prompt( 'Какой годовой процент', 10 );
                appData.moneyDeposit = prompt( 'Какая сумма заложена?', 10000 );
            } while ( isNaN( appData.moneyDeposit ) || appData.moneyDeposit === '' || appData.moneyDeposit === null || 
            isNaN( appData.percentDeposit ) || appData.percentDeposit === '' || appData.percentDeposit === null );
        } 

    },
    // Считаем деньги за период
    calcSavedMoney: function () {

        return appData.budgetMonth * appData.period;

    }
};

// Вызовы функции 
appData.asking();
let expensesMonth = appData.getExpensesMonth(),
    accumulatedMonth = appData.getBudget(),
    targetMonth = appData.getTargetMonth();
appData.getStatusIncome();
appData.getInfoDeposit();
appData.calcSavedMoney();

// Вывод консоли
console.log( 'Расходы за месяц: ', appData.expensesMonth );
console.log( targetMonth );
console.log( appData.getStatusIncome() );

// Вывести все свойства и значения для объекта appData
for (let key in appData) {
    console.log( 'Наша программа ' + key + ' включает в себя данные: ' + appData[key] );
}