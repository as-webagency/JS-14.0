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

const AppData = function () {
    
    this.budget = 0;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;

};

// Доход за месяц
AppData.prototype.start = function () {

    const _this = this;
        
    this.budget = +salaryAmount.value;

    disabledInputData.forEach( function ( element ) {
        element.setAttribute( 'disabled', 'true' );
        start.style.display = 'none';
        cancel.style.display = 'block';
    });

    let incomeItemsInputReset = document.querySelectorAll( '.income-items > input' ),
        expensesItemsInputReset = document.querySelectorAll( '.expenses-items > input' );

    incomeItemsInputReset.forEach( function ( element ) {
        element.setAttribute( 'disabled', 'true' );
    });
    
    expensesItemsInputReset.forEach( function ( element ) {
        element.setAttribute( 'disabled', 'true' );
    });

    cancel.addEventListener( 'click', function () {
        _this.reset();
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
};

// Программу возвращаем в исходное состояние
AppData.prototype.reset = function () {
        
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
    
};

// Показать результаты
AppData.prototype.showResult = function () {

    const _this = this;
    
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.ceil( this.budgetDay );
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();

    periodSelect.addEventListener( 'input', function () {
        incomePeriodValue.value = _this.calcPeriod();
        periodAmount.innerHTML = periodSelect.value;
    });

};

// Клонируем поля "Обязательные расходы"
AppData.prototype.addExpensesBlock = function () {
    
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

};

// Клонируем поля "Дополнительный расходы"
AppData.prototype.addIncomeBlock = function () {

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

};

// Получаем все Обязательные расходы
AppData.prototype.getExpenses = function () {

    const _this = this;

    expensesItems.forEach(function ( item ) {
        let itemExpenses = item.querySelector( '.expenses-title' ).value,
            cashExpenses = item.querySelector( '.expenses-amount' ).value;
        
        if ( itemExpenses !== '' && cashExpenses !== '' ) {
            _this.expenses[itemExpenses] = cashExpenses;
        }

    });

};

// Получаем все Дополнительный доход
AppData.prototype.getIncome = function () {

    const _this = this;

    incomeItems.forEach(function ( item ) {
        let itemIncome = item.querySelector( '.income-title' ).value,
            cashIncome = item.querySelector( '.income-amount' ).value;
        
        if ( itemIncome !== '' && cashIncome !== '' ) {
            _this.expenses[itemIncome] = cashIncome;
        }

    });

    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }

};

// Дополнительные расходы
AppData.prototype.getAddExpenses = function () {
    
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');

    addExpenses.forEach(function ( item ) {
        item = item.trim();
        if ( item !== '' ) {
            _this.addExpenses.push( item );
        }
    });

};

// Добавляем все доходы
AppData.prototype.getAddIncome = function () {

    const _this = this;

    additionalIncomeItem.forEach(function ( item ) {
        let itemValue = item.value.trim();
        if ( itemValue !== '' ) {
            _this.addIncome.push( itemValue );
        }
    });

};

// Функция возвращает сумму всех обязательных расходов за месяц
AppData.prototype.getExpensesMonth = function () {

    for (let key in this.expenses) {
        this.expensesMonth += +this.expenses[key];
    }

};

// Функция возвращает Накопления за месяц (Доходы минус расходы)
AppData.prototype.getBudget = function () {

    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;

};

// Объявить функцию getTargetMonth. Подсчитывает за какой период будет достигнута цель, 
// зная результат месячного накопления (accumulatedMonth) и возвращает результат
AppData.prototype.getTargetMonth = function () {
    
    return targetAmount.value / this.budgetMonth;

};

// Конструкция условий
AppData.prototype.getStatusIncome = function () {

    if ( this.budgetDay > 1200 ) {
        // Если budgetDay больше 1200, то “У вас высокий уровень дохода”
        return ( 'У вас высокий уровень дохода' );
    } else if ( this.budgetDay > 600 && this.budgetDay < 1200 ) {
        // Если budgetDay больше 600 и меньше 1200, то сообщение “У вас средний уровень дохода”
        return ( 'У вас средний уровень дохода' );
    } else if ( this.budgetDay < 600 && this.budgetDay > 0 ) {
        // Если budgetDay меньше 600 то в консоль вывести сообщение “К сожалению у вас уровень дохода ниже среднего”
        return ( 'К сожалению у вас уровень дохода ниже среднего' );
    } else if ( this.budgetDay <= 0 || -this.budgetDay ) {
        // Если отрицательное значение то вывести “Что то пошло не так”
        return ( 'Что то пошло не так' );
    }

};

// Есть ли депозит в банке
AppData.prototype.getInfoDeposit = function () {

    if ( this.deposit ) {
        do {
            this.percentDeposit = prompt( 'Какой годовой процент', 10 );
            this.moneyDeposit = prompt( 'Какая сумма заложена?', 10000 );
        } while ( isNaN( this.moneyDeposit ) || this.moneyDeposit === '' || this.moneyDeposit === null || 
        isNaN( this.percentDeposit ) || this.percentDeposit === '' || this.percentDeposit === null );
    } 

};

// Считаем деньги за период
AppData.prototype.calcPeriod = function () {

    return this.budgetMonth * periodSelect.value;

};

// Обработчики событий и атрибуты
AppData.prototype.eventsListeners = function () {
    
    // Слушатели событий
    let startBind = this.start.bind( this );
    start.addEventListener( 'click', startBind );

    btnPlusExpenses.addEventListener( 'click', this.addExpensesBlock );
    btnPlusIncome.addEventListener( 'click', this.addIncomeBlock );
    
    //Добавляем атрибуты
    if ( salaryAmount.value === '' ) {
        start.setAttribute( 'disabled', 'true' );
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

};

const appData = new AppData();
appData.eventsListeners();