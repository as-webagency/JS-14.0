'use strict';

const todoControl = document.querySelector( '.todo-control' ),
    headerInput = document.querySelector( '.header-input' ),
    todoList = document.querySelector( '.todo-list' ),
    todoCompleted = document.querySelector( '.todo-completed' ),
    textTodo = document.querySelector( '.text-todo' );

const todoData = [];

const render = function () {

    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach( function ( item ) {

        const li = document.createElement( 'li' );
        li.classList.add( 'todo-item' );
        li.innerHTML = '<span class="text-todo">' + item.value + '</span>' + 
            '<div class="todo-buttons">' + 
                '<button class="todo-remove"></button>' + 
                '<button class="todo-complete"></button>' + 
            '</div>';

        if ( item.completed ) {
            todoCompleted.append( li );
        } else {
            todoList.append( li );
        }

        const btnTodoComplete = li.querySelector( '.todo-complete' );
        btnTodoComplete.addEventListener( 'click', function () {
            item.completed = !item.completed;
            render();
        });

        const todoRemove = li.querySelector( '.todo-remove' );
        todoRemove.addEventListener( 'click', function () {
            li.remove();
        });
        
    });
    
};  

todoControl.addEventListener( 'submit', function ( event ) {
    event.preventDefault();

    const newTodo = {
        value: headerInput.value,
        completed: false
    };

    if ( headerInput.value !== '' ) {
        todoData.push( newTodo );
        headerInput.value = '';
    }

    localStorage.textTodo = headerInput.value;

    render();

});

// const showText = function () {
//     headerInput.textContent = localStorage.headerInput;
// };

// todoControl.addEventListener( 'click', function () {

//     localStorage.li = headerInput.value;
//     showText();
// });

render();