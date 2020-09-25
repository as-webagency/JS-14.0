'use strict';

const start = document.getElementById( 'start' ),
    btnPlusIncome = document.getElementsByTagName( 'button' )[0],
    btnPlusExpenses = document.getElementsByTagName( 'button' )[1],
    depositCheck = document.getElementById( 'deposit-check' ),
    additionalIncomeItem = document.querySelectorAll( '.additional_income-item' ),
    budgetMonthValue = document.getElementsByClassName( 'budget_month-value' )[0],
    budgetDayValue = document.getElementsByClassName( 'budget_day-value' )[0],
    expensesMonthValue = document.getElementsByClassName( 'expenses_month-value' )[0],
    additionalIncomeValue = document.getElementsByClassName( 'additional_income-value' )[0],
    additionalExpensesValue = document.getElementsByClassName( 'additional_expenses-value' )[0],
    incomePeriodValue = document.getElementsByClassName( 'income_period-value' )[0],
    targetMonthValue = document.getElementsByClassName( 'target_month-value' )[0],
    salaryAmount = document.querySelector( '.salary-amount' ),
    incomeTitle = document.querySelector( '.income-items > .income-title' ),
    incomeAmount = document.querySelector( '.income-amount' ),
    expensesTitle = document.querySelector( '.expenses-items > .expenses-title' ),
    additionalExpensesItem = document.querySelector( '.additional_expenses-item' ),
    targetAmount = document.querySelector( '.target-amount' ),
    periodSelect = document.querySelector( '.period-select' ),
    periodAmount = document.querySelector( '.period-amount' ),
    startHover = document.querySelector( '.result #cancel:hover, .result #start:hover' ),
    disabledInputData = document.querySelectorAll( '.data input[type=text]' ),
    cancel = document.getElementById( 'cancel' ),
    allInput = document.querySelectorAll( 'input[type=text]' ),
    depositBank = document.querySelector( '.deposit-bank' ),
    depositAmount = document.querySelector( '.deposit-amount' ),
    depositPercent = document.querySelector( '.deposit-percent' );

let expensesItems = document.querySelectorAll( '.expenses-items' ),
    incomeItems = document.querySelectorAll( '.income-items' );

class AppData {

    constructor() {

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

    }
    // Доход за месяц
    start() {

        this.budget = +salaryAmount.value;

        disabledInputData.forEach( element => {
            element.setAttribute( 'disabled', true );
            start.style.display = 'none';
            cancel.style.display = 'block';
        });

        const incomeItemsInputReset = document.querySelectorAll( '.income-items > input' ),
            expensesItemsInputReset = document.querySelectorAll( '.expenses-items > input' );

        incomeItemsInputReset.forEach( element => {
            element.setAttribute( 'disabled', true );
        });
        
        expensesItemsInputReset.forEach( element => {
            element.setAttribute( 'disabled', true );
        });

        cancel.addEventListener( 'click', () => {
            this.reset();
        });

        // Вызовы функции 
        this.getExpInc();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposit();
        this.getBudget();
        
        // showResult - должна вызываться последней
        this.showResult();

    }
    // Программу возвращаем в исходное состояние
    reset() {

        disabledInputData.forEach( element => {
            element.removeAttribute( 'disabled', 'disabled' );
            start.style.display = 'block';
            cancel.style.display = 'none';
        });
    
        allInput.forEach( element => {
            element.value = '';
        });
    
        const incomeItemsInputReset = document.querySelectorAll( '.income-items > input' ),
            expensesItemsInputReset = document.querySelectorAll( '.expenses-items > input' ),
            incomeItemsReset = document.querySelectorAll( '.income-items' ),
            expensesItemsReset = document.querySelectorAll( '.expenses-items' );
    
        incomeItemsInputReset.forEach( element => {
            element.removeAttribute( 'disabled', 'disabled' );
            element.value = '';
        });
        
        if ( incomeItemsReset.length > 1 ) {
            incomeItemsReset[1].remove();
            incomeItemsReset[2].remove();
        }
        
        expensesItemsInputReset.forEach( element => {
            element.removeAttribute( 'disabled', 'disabled' );
            element.value = '';
        });
    
        if ( expensesItemsReset.length > 1 ) {
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

    }
    // Показать результаты
    showResult() {

        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.ceil( this.budgetDay );
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();

        periodSelect.addEventListener( 'input', () => {
            incomePeriodValue.value = this.calcPeriod();
            periodAmount.innerHTML = periodSelect.value;
        });

    }
    // Клонируем поля "Обязательные расходы"
    addExpensesBlock() {

        const cloneExpensesItem = expensesItems[0].cloneNode(true),
        inputsCloneValue = cloneExpensesItem.querySelectorAll( 'input' );

        inputsCloneValue.forEach( input => {
            input.value = '';
        });
        
        expensesItems[0].parentNode.insertBefore( cloneExpensesItem, btnPlusExpenses );
        expensesItems = document.querySelectorAll( '.expenses-items' );

        const incomeExpensesNumber = document.querySelectorAll( '.expenses-amount' );
        incomeExpensesNumber.forEach( element => {
            element.addEventListener( 'input', () => {
                element.value = element.value.replace(/[^0-9]/g, '');
            });
        });

        const expensesTitleLetterSings = document.querySelectorAll( '.expenses-title' );
        expensesTitleLetterSings.forEach( element => {
            element.addEventListener( 'input', () => {
                element.value = element.value.replace(/[^а-я\s\,\.]/, '');
            });
        });

        if ( expensesItems.length === 3 ) {
            btnPlusExpenses.style.display = 'none';
        }

    }
    // Клонируем поля "Дополнительный расходы"
    addIncomeBlock() {

        const cloneIncomeItem = incomeItems[0].cloneNode(true),
        inputsCloneValue = cloneIncomeItem.querySelectorAll( 'input' );
        
        inputsCloneValue.forEach( input => {
            input.value = '';
        });

        incomeItems[0].parentNode.insertBefore( cloneIncomeItem, btnPlusIncome );
        incomeItems = document.querySelectorAll( '.income-items' );

        const incomeAmountNumber = document.querySelectorAll( '.income-amount' );
        incomeAmountNumber.forEach( element => {
            element.addEventListener( 'input', () => {
                element.value = element.value.replace(/[^0-9]/g, '');
            });
        });
        
        const incomeTitleLetterSings = document.querySelectorAll( '.income-title' );
        incomeTitleLetterSings.forEach( element => {
            element.addEventListener( 'input', () => {
                element.value = element.value.replace(/[^а-я\s\,\.]/, '');
            });
        });

        if ( incomeItems.length === 3 ) {
            btnPlusIncome.style.display = 'none';
        }

    }
    // Получаем Дополнительный доход и Обязательный расходы
    getExpInc() {

        const count = item => {

            const startStr = item.className.split( '-' )[0],
                itemTitle = item.querySelector( `.${startStr}-title` ).value,
                itemAmount = item.querySelector( `.${startStr}-amount` ).value;
    
            if ( itemTitle !== '' && itemAmount !== '' ) {
                this[startStr][itemTitle] = itemAmount;
            }
    
            
        };
        
        incomeItems.forEach( count );
        expensesItems.forEach( count );
    
        for ( const key in this.income ) {
            this.incomeMonth += +this.income[key];
        }

    }
    // Дополнительные расходы
    getAddExpenses() {

        const addExpenses = additionalExpensesItem.value.split(',');

        addExpenses.forEach( item => {
            item = item.trim();
            if ( item !== '' ) {
                this.addExpenses.push( item );
            }
        });

    }
    // Добавляем все доходы
    getAddIncome() {

        additionalIncomeItem.forEach( item => {
            const itemValue = item.value.trim();
            if ( itemValue !== '' ) {
                this.addIncome.push( itemValue );
            }
        });

    }
    // Функция возвращает сумму всех обязательных расходов за месяц
    getExpensesMonth() {

        for (const key in this.expenses) {
            this.expensesMonth += +this.expenses[key];
        }

    }
    // Функция возвращает Накопления за месяц (Доходы минус расходы)
    getBudget() {

        const monthDeposit = this.moneyDeposit * ( this.percentDeposit / 100 );
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = this.budgetMonth / 30;

    }
    /*Объявить функцию getTargetMonth. Подсчитывает за какой период будет достигнута цель, 
    зная результат месячного накопления (accumulatedMonth) и возвращает результат*/
    getTargetMonth() {

        return targetAmount.value / this.budgetMonth;

    }
    // Конструкция условий
    getStatusIncome() {

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

    }
    // Есть ли депозит в банке
    getInfoDeposit() {

        if ( this.deposit ) {
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        } 

    }
    // Считаем деньги за период
    calcPeriod() {

        return this.budgetMonth * periodSelect.value;

    }
    // Какой банк выбрал пользователь
    changePercent() {

        const valueSelect = this.value;
        if ( valueSelect === 'other' ) {
            depositPercent.style.display = 'inline-block';
            depositPercent.addEventListener( 'input', () => {
                if ( ( isNaN( depositPercent.value ) ) || ( depositPercent.value < 0 || 
                    depositPercent.value >= 100 ) ) {
                    start.setAttribute( 'disabled', 'disabled' );
                    alert( 'Введите корректное значение в поле проценты' );
                } else {
                    start.removeAttribute( 'disabled', 'disabled' );
                }
            });
        } else {
            depositPercent.value = valueSelect;
            depositPercent.style.display = 'none';
        }

    }
    // Проверка на checkbox
    depositHandler() {

        depositAmount.addEventListener( 'input', () => {
            depositAmount.value = depositAmount.value.replace(/[^0-9]/g, '');
        });

        if ( depositCheck.checked ) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener( 'change', this.changePercent );
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener( 'change', this.changePercent );
        }

    }
    // Обработчики событий и атрибуты
    eventsListeners() {

        // Слушатели событий
        const startBind = this.start.bind( this );
        start.addEventListener( 'click', startBind );

        btnPlusExpenses.addEventListener( 'click', this.addExpensesBlock );
        btnPlusIncome.addEventListener( 'click', this.addIncomeBlock );

        depositCheck.addEventListener( 'change', this.depositHandler.bind( this ));
        
        //Добавляем атрибуты
        if ( salaryAmount.value === '' ) {
            start.setAttribute( 'disabled', true );
            start.style.opacity = 1;
        }

        salaryAmount.addEventListener( 'input', () => {
            start.removeAttribute( 'disabled', 'disabled' );
            start.style.opacity = startHover;
        });

        // Пропускаем только числа
        salaryAmount.addEventListener( 'input', () => {
            salaryAmount.value = salaryAmount.value.replace(/[^0-9]/g, '');
        });

        incomeAmount.addEventListener( 'input', () => {
            incomeAmount.value = incomeAmount.value.replace(/[^0-9]/g, '');
        });

        const expensesAmount = document.querySelector( '.expenses-amount' );
        expensesAmount.addEventListener( 'input', () => {
            expensesAmount.value = expensesAmount.value.replace(/[^0-9]/g, '');
        });

        targetAmount.addEventListener( 'input', () => {
            targetAmount.value = targetAmount.value.replace(/[^0-9]/g, '');
        });

        // Пропускаем только русские буквы, пробелы и знаки препинания
        incomeTitle.addEventListener( 'input', () => {
            incomeTitle.value = incomeTitle.value.replace(/[^а-я\s\,\.]/, '');
        });

        expensesTitle.addEventListener( 'input', () => {
            expensesTitle.value = expensesTitle.value.replace(/[^а-я\s\,\.]/, '');
        });

        additionalIncomeItem.forEach( element => {
            element.addEventListener( 'input', () => {
                element.value = element.value.replace(/[^а-я\s\,\.]/, '');
            });
        });

        additionalExpensesItem.addEventListener( 'input', () => {
            additionalExpensesItem.value = additionalExpensesItem.value.replace(/[^а-я\s\,\.]/, '');
        });

        // Ползунок
        periodSelect.addEventListener( 'input', () => {
            periodAmount.innerHTML = periodSelect.value;
        });

    }
    
}

const appData = new AppData();
appData.eventsListeners();