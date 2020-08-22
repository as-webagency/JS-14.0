'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat( n )) && isFinite( n );
};

let money,
    expenseItem,
    start = function () {
        do {
            money = prompt( 'Ваш месячный доход? ', '' );
        } while ( !isNumber( money ) || money === '' || money === null);
};
start();

let appData = {
    income: {}, // строка с дополнительными доходом (например: фриланс)
    addIncome: [],
    expenses: {},
    addExpenses: [], // перечисляем дополнительный расход
    deposit: false,
    mission: 50000, // любое число (Какую сумму хотите накопить)
    period: 3, // число от 1 до 12 (месяцев)
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {

        let addExpenses = prompt( 'Перечислите возможные расходы за рассчитываемый период через запятую ', '' ),
            cost;
            appData.addExpenses = addExpenses.toLowerCase().split( ', ' );
            appData.deposit = confirm( 'Есть ли у вас депозит в банке? ' );

        for (let i = 0; i < 2; i++) {

            expenseItem = prompt( 'Введите обязательную статью расходов? ', '' );
            cost = prompt('Во сколько это обойдется?', '');

            if ( (typeof (expenseItem)) === 'string' && expenseItem !== null && 
                expenseItem !== '' && cost !== '' && cost !== null ) {
                appData.expenses[expenseItem] = cost;
            } else {
                i = i - 1;
            }

        }
            
    },
    getExpensesMonth: function () {

        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }

    },
    // Функция getAccumulatedMonth возвращает Накопления за месяц (Доходы минус расходы)
    getAccumulatedMonth: function () {
        return money - appData.expensesAmount;
    },
    /* Функция getTargetMonth подсчитывает за какой период будет достигнута цель, 
    зная результат месячного накопления (accumulatedMonth) и возвращает результат*/
    getTargetMonth: function () {

        let target = appData.mission / money;
        target = Math.ceil(target);

        if (target > 0) {
            return ( 'Цель будет достигнута через ' + target + ' месяцев' );
        } else {
            return ( 'Цель не будет достигнута' );
        }

    },
    getBudget: function () {

        appData.budgetMonth = Math.floor(money - appData.budgetMonth);
        appData.budgetDay = appData.budgetMonth / 30;
        return money - appData.expensesMonth;

    },
    getStatusIncome: function () {
        if ( appData.budgetDay >= 1200 ) {
            return ( 'У вас высокий уровень дохода' );
        } else if ( appData.budgetDay > 600 && appData.budgetDay < 1200 ) {
            return ( 'У вас средний уровень дохода' );
        } else if ( appData.budgetDay < 600 && appData.budgetDay > 0 ) {
            return ( 'К сожалению у вас уровень дохода ниже среднего' );
        } else if ( appData.budgetDay <= 0 || -appData.budgetDay ) {
            return ( 'Что то пошло не так' );
        }
    },
    consolLog: function () {
        
        console.log( 'Расходы за месяц:', appData.expensesMonth );
        console.log( appData.getTargetMonth() );
        console.log( 'Уровень дохода -', appData.getTargetMonth() );

    },
    wholeAppData: function () {

        for (let key in appData) {
            console.log( 'Наша программа ' + key + ' включает в себя данные: ' + appData[key] );
        }

    }
};

appData.asking();
appData.getBudget();
appData.wholeAppData();

let expensesMonth = appData.getExpensesMonth(),
    targetMonth = appData.getTargetMonth(),
    statusIncome = appData.getStatusIncome(),
    consol = appData.consolLog();