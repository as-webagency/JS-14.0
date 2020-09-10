'use strict';

const todoControl = document.querySelector( '.todo-control' ), // Форма
    headerInput = document.querySelector( '.header-input' ), // input который извлекает значение
    todoList = document.querySelector( '.todo-list' ), // Добавляем дела
    todoCompleted = document.querySelector( '.todo-completed' ); // Добавляем выполненые дела

// Массив в котором будут хранится дела (Из JS в Json формат)
const todoData = JSON.parse( localStorage.getItem( 'savesToDo' ) ) || [];

// Функция, которая рендерит(добавляет) дело
const render = function () {

    // Очищаем от предыдущих дел
    todoList.textContent = '';
    todoCompleted.textContent = '';
    
    // Перебираем массив
    todoData.forEach( function ( item, index ) {

        // Создаем список
        const li = document.createElement( 'li' );
        li.classList.add( 'todo-item' );

        // Добавляем верстку
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
            '<div class="todo-buttons">' + 
                '<button class="todo-remove"></button>' + 
                '<button class="todo-complete"></button>' + 
            '</div>';

        // Добавляем элемент в начало списка
        if ( item.completed ) {
            todoCompleted.prepend( li );
        } else {
            todoList.prepend( li );
        }

        // Меняем статус дела
        const btnTodoComplete = li.querySelector( '.todo-complete' );
        btnTodoComplete.addEventListener( 'click', function () {
            item.completed = !item.completed;
            saveToDo();
            render();
        });

        // Удаляем блок li из списка
        const todoRemove = li.querySelector( '.todo-remove' );
        todoRemove.addEventListener( 'click', function () {
            todoData.splice( index, 1 );
            saveToDo();
            render();
        });
    
    });
    
},

// Функция конвертор - из JSON в JS
saveToDo = () => {
    localStorage.setItem( 'savesToDo', JSON.stringify( todoData ) );
};

// На форму навешиваем событие submit
todoControl.addEventListener( 'submit', function ( event ) {
    event.preventDefault();
    
    // Новый объект для массива
    const newTodo = {
        value: headerInput.value,
        completed: false
    };
    
    // Проверка на пустую строку
    if ( headerInput.value.trim() === '' ) return;

    // Добавляем новый объект
    todoData.push( newTodo );
    // Очищаем input 
    todoControl.reset();

    saveToDo();
    // Вызываем функцию рендера для обновления всех дел
    render();
    
});

// Вызываем функцию рендера для сохранения всего при перезагрузке страницы
render();