'use strict';

let start = document.getElementById( 'start' ),
    btnPlusIncome = document.getElementsByTagName( 'button' )[0],
    btnPlusExpenses = document.getElementsByTagName( 'button' )[1],
    depositCheck = document.querySelector( '#deposit-check' ),
    additionalIncomeItem = document.querySelectorAll( '.additional_income-item' ),
    budgetMonthValue = document.getElementsByClassName( 'budget_month-value' )[0],
    budgetDayValue = document.getElementsByClassName( 'budget_day-value' )[0],
    expensesMonthValue = document.getElementsByClassName( 'expenses_month-value' )[0],
    additionalIncomeValue = document.getElementsByClassName( 'additional_income-value' )[0],
    additionalExpensesValue = document.getElementsByClassName( 'additional_expenses-value' )[0],
    incomePeriodValue = document.getElementsByClassName( 'income_period-value' )[0],
    targetMonthValue = document.getElementsByClassName( 'target_month-value' )[0],
    salaryAmount = document.querySelector( '.salary-amount' ),
    incomeItems = document.querySelectorAll( '.income-items' ),
    incomeTitle = document.querySelector( '.income-items > .income-title' ),
    incomeAmount = document.querySelector( '.income-amount' ),
    expensesItems = document.querySelectorAll( '.expenses-items' ),
    expensesTitle = document.querySelector( '.expenses-items > .expenses-title' ),
    additionalExpensesItem = document.querySelector( '.additional_expenses-item' ),
    targetAmount = document.querySelector( '.target-amount' ),
    periodSelect = document.querySelector( '.period-select' ),
    periodAmount = document.querySelector( '.period-amount' ),
    startHover = document.querySelector( '.result #cancel:hover, .result #start:hover' ),
    disabledInputData = document.querySelectorAll( '.data input[type=text]' ),
    cancel = document.getElementById( 'cancel' ),
    allInput = document.querySelectorAll( 'input[type=text]' );
    
let appData = {
    budget: 0,
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    incomeMonth: 0,
    // Доход за месяц
    start: function () {
        
        this.budget = +salaryAmount.value;

        disabledInputData.forEach( function ( element ) {
            element.setAttribute( 'disabled', 'disabled' );
            start.style.display = 'none';
            cancel.style.display = 'block';
        });

        let incomeItemsInputReset = document.querySelectorAll( '.income-items > input' ),
            expensesItemsInputReset = document.querySelectorAll( '.expenses-items > input' );

        incomeItemsInputReset.forEach( function ( element ) {
            element.setAttribute( 'disabled', 'disabled' );
        });
        
        expensesItemsInputReset.forEach( function ( element ) {
            element.setAttribute( 'disabled', 'disabled' );
        });

        cancel.addEventListener( 'click', function () {
            appData.reset();
        });

        // Вызовы функции 
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        
        // showResult - должна вызываться последней
        this.showResult();
        
    },
    // Программу возвращаем в исходное состояние
    reset: function () {
        
        disabledInputData.forEach( function ( element ) {
            element.removeAttribute( 'disabled', 'disabled' );
            start.style.display = 'block';
            cancel.style.display = 'none';
        });

        allInput.forEach( function ( element ) {
            element.value = '';
        });

        let incomeItemsInputReset = document.querySelectorAll( '.income-items > input' ),
            expensesItemsInputReset = document.querySelectorAll( '.expenses-items > input' ),
            incomeItemsReset = document.querySelectorAll( '.income-items' ),
            expensesItemsReset = document.querySelectorAll( '.expenses-items' );

        incomeItemsInputReset.forEach( function ( element ) {
            element.removeAttribute( 'disabled', 'disabled' );
            element.value = '';
        });
        
        if (incomeItemsReset.length > 1) {
            incomeItemsReset[1].remove();
            incomeItemsReset[2].remove();
        }
        
        expensesItemsInputReset.forEach( function ( element ) {
            element.removeAttribute( 'disabled', 'disabled' );
            element.value = '';
        });

        if (expensesItemsReset.length > 1) {
            expensesItemsReset[1].remove();
            expensesItemsReset[2].remove();
        }

        if ( incomeItems.length > 2 ) {
            btnPlusIncome.style.display = 'block';
        }

        if ( expensesItems.length > 2 ) {
            btnPlusExpenses.style.display = 'block';
        }

        periodAmount.innerHTML = periodSelect.value = 1;
        
    },
    // Показать результаты
    showResult: function () {
        
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.ceil( this.budgetDay );
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();

        periodSelect.addEventListener( 'input', function () {
            incomePeriodValue.value = appData.calcPeriod();
            periodAmount.innerHTML = periodSelect.value;
        });

    },
    // Клонируем поля "Обязательные расходы"
    addExpensesBlock: function () {
        
        let cloneExpensesItem = expensesItems[0].cloneNode(true),
            inputsCloneValue = cloneExpensesItem.querySelectorAll( 'input' );

        inputsCloneValue.forEach( function ( input ) {
            input.value = '';
        });
        
        expensesItems[0].parentNode.insertBefore( cloneExpensesItem, btnPlusExpenses );
        expensesItems = document.querySelectorAll( '.expenses-items' );

        let incomeExpensesNumber = document.querySelectorAll( '.expenses-amount' );
        incomeExpensesNumber.forEach( function ( element ) {
            element.addEventListener( 'input', function () {
                element.value = element.value.replace(/[^0-9]/g, '');
            });
        });

        let expensesTitleLetterSings = document.querySelectorAll( '.expenses-title' );
        expensesTitleLetterSings.forEach( function ( element ) {
            element.addEventListener( 'input', function () {
                element.value = element.value.replace(/[^а-я\s\,\.]/, '');
            });
        });

        if ( expensesItems.length === 3 ) {
            btnPlusExpenses.style.display = 'none';
        }

    },
    // Клонируем поля "Дополнительный расходы"
    addIncomeBlock: function () {

        let cloneIncomeItem = incomeItems[0].cloneNode(true),
            inputsCloneValue = cloneIncomeItem.querySelectorAll( 'input' );
            
        inputsCloneValue.forEach( function ( input ) {
            input.value = '';
        });

        incomeItems[0].parentNode.insertBefore( cloneIncomeItem, btnPlusIncome );
        incomeItems = document.querySelectorAll( '.income-items' );

        let incomeAmountNumber = document.querySelectorAll( '.income-amount' );
        incomeAmountNumber.forEach( function ( element ) {
            element.addEventListener( 'input', function () {
                element.value = element.value.replace(/[^0-9]/g, '');
            });
        });
        
        let incomeTitleLetterSings = document.querySelectorAll( '.income-title' );
        incomeTitleLetterSings.forEach( function ( element ) {
            element.addEventListener( 'input', function () {
                element.value = element.value.replace(/[^а-я\s\,\.]/, '');
            });
        });

        if ( incomeItems.length === 3 ) {
            btnPlusIncome.style.display = 'none';
        }

    },
    // Получаем все Обязательные расходы
    getExpenses: function () {

        expensesItems.forEach(function ( item ) {
            let itemExpenses = item.querySelector( '.expenses-title' ).value,
                cashExpenses = item.querySelector( '.expenses-amount' ).value;
            
            if ( itemExpenses !== '' && cashExpenses !== '' ) {
                appData.expenses[itemExpenses] = cashExpenses;
            }

        });

    },
    // Получаем все Дополнительный доход
    getIncome: function () {

        incomeItems.forEach(function ( item ) {
            let itemIncome = item.querySelector( '.income-title' ).value,
                cashIncome = item.querySelector( '.income-amount' ).value;
            
            if ( itemIncome !== '' && cashIncome !== '' ) {
                appData.expenses[itemIncome] = cashIncome;
            }

        });

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
            console.log('this: ', this);
        }

    },
    // Дополнительные расходы
    getAddExpenses: function () {
        
        let addExpenses = additionalExpensesItem.value.split(',');

        addExpenses.forEach(function ( item ) {
            item = item.trim();
            if ( item !== '' ) {
                appData.addExpenses.push( item );
            }
        });

    },
    // Добавляем все доходы
    getAddIncome: function () {

        additionalIncomeItem.forEach(function ( item ) {
            let itemValue = item.value.trim();
            if ( itemValue !== '' ) {
                appData.addIncome.push( itemValue );
            }
        });

    },
    // Функция возвращает сумму всех обязательных расходов за месяц
    getExpensesMonth: function () {

        for (let key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }
    
    },
    // Функция возвращает Накопления за месяц (Доходы минус расходы)
    getBudget: function () {

        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;

    },
    // Объявить функцию getTargetMonth. Подсчитывает за какой период будет достигнута цель, 
    // зная результат месячного накопления (accumulatedMonth) и возвращает результат
    getTargetMonth: function () {
        
        return targetAmount.value / appData.budgetMonth;

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
    calcPeriod: function () {

        return this.budgetMonth * periodSelect.value;

    }
};

//Добавляем атрибуты
if ( salaryAmount.value === '' ) {
    start.setAttribute( 'disabled', 'disabled' );
    start.style.opacity = 1;
}

salaryAmount.addEventListener( 'input', function () {
    start.removeAttribute( 'disabled', 'disabled' );
    start.style.opacity = startHover;
});

// Пропускаем только числа
salaryAmount.addEventListener( 'input', function () {
    salaryAmount.value = salaryAmount.value.replace(/[^0-9]/g, '');
});

incomeAmount.addEventListener( 'input', function () {
    incomeAmount.value = incomeAmount.value.replace(/[^0-9]/g, '');
});

let expensesAmount = document.querySelector( '.expenses-amount' );
expensesAmount.addEventListener( 'input', function () {
    expensesAmount.value = expensesAmount.value.replace(/[^0-9]/g, '');
});

targetAmount.addEventListener( 'input', function () {
    targetAmount.value = targetAmount.value.replace(/[^0-9]/g, '');
});

// Пропускаем только русские буквы, пробелы и знаки препинания
incomeTitle.addEventListener( 'input', function () {
    incomeTitle.value = incomeTitle.value.replace(/[^а-я\s\,\.\s\,\.]/, '');
});

expensesTitle.addEventListener( 'input', function () {
    expensesTitle.value = expensesTitle.value.replace(/[^а-я\s\,\.]/, '');
});

additionalIncomeItem.forEach( function ( element ) {
    element.addEventListener( 'input', function () {
        element.value = element.value.replace(/[^а-я\s\,\.]/, '');
    });
});

additionalExpensesItem.addEventListener( 'input', function () {
    additionalExpensesItem.value = additionalExpensesItem.value.replace(/[^а-я\s\,\.]/, '');
});

// Ползунок
periodSelect.addEventListener( 'input', function () {
    periodAmount.innerHTML = periodSelect.value;
});

// Слушатели событий
let startBind = appData.start.bind( appData );
start.addEventListener( 'click', startBind );

btnPlusExpenses.addEventListener( 'click', appData.addExpensesBlock );
btnPlusIncome.addEventListener( 'click', appData.addIncomeBlock );

// Вывод консоли
// console.log( 'Расходы за месяц: ', appData.expensesMonth );
// console.log( targetMonth );
// console.log( appData.getStatusIncome() );

// Вывести все свойства и значения для объекта appData
// for (let key in appData) {
//     console.log( 'Наша программа ' + key + ' включает в себя данные: ' + appData[key] );
// }