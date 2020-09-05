'use strict';

const books = document.querySelector( '.books' ),
    book = document.querySelectorAll( '.book' ),
    body = document.querySelector( 'body' ),
    bookTitle = document.querySelectorAll( 'h2 > a' ),
    adverTising = document.querySelector( '.adv' ),
    bookList = document.querySelectorAll( 'ul > li' );
    
// Восстановить порядок книг.
book[0].before( book[1] );
book[3].before( book[4] );
book[2].before( book[4] );
book[2].before( book[3] );
book[2].before( book[5] );

// Заменить картинку заднего фона на другую из папки image
body.style = "background-image: url('./image/you-dont-know-js.jpg')";

// Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
bookTitle[4].textContent = 'Книга 3. this и Прототипы Объектов';

// Удалить рекламу со страницы
adverTising.remove();

// Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools)
bookList[2].before( bookList[3] );
bookList[2].before( bookList[6] );
bookList[2].before( bookList[8] );
bookList[2].before( bookList[4] );
bookList[2].before( bookList[5] );
bookList[9].after( bookList[2] );

bookList[48].before( bookList[55] );
bookList[48].before( bookList[49] );
bookList[48].before( bookList[50] );
bookList[51].before( bookList[52] );
bookList[51].after( bookList[54] );
bookList[53].before( bookList[54] );
bookList[54].before( bookList[53] );
bookList[51].before( bookList[53] );

// в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
const restore = document.querySelectorAll('ul'),
    restoreOrder = document.querySelectorAll('li');
const naewRestore = document.createElement('li');
naewRestore.textContent = 'Глава 8: За пределами ES6';
restore[5].appendChild(naewRestore);
restore[5].insertBefore(restoreOrder[56], restoreOrder[57]);