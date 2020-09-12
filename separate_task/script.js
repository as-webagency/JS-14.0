'use strict';

function DomElement ( selector, height, width, background, fontSize ) {

    this.selector = selector;
    this.height = height;
    this.width = width;
    this.background = background;
    this.fontSize = fontSize;

}

DomElement.prototype.createElem = function () {

    this.selector = prompt( 'Укажите селектор', '' );

    if ( this.selector === '.' ) {
        let div = document.createElement( 'div' );
        div.className = 'selector';
        div.textContent = prompt( 'Введите текст', '' );
        div.style.height = prompt( 'Укажите высоту', '' ) + 'px';
        div.style.width = prompt( 'Укажите ширину', '' ) + 'px';
        div.style.background = prompt( 'Укажите фоновый цвет', '' );
        div.style.fontSize = prompt( 'Укажите размер шрифта', '' ) + 'px';
        document.body.prepend(div);
    } else if ( this.selector === '#' ) {
        let p = document.createElement( 'p' );
        p.id = 'selector';
        p.textContent = prompt( 'Введите текст', '' );
        p.style.height = prompt( 'Укажите высоту', '' ) + 'px';
        p.style.width = prompt( 'Укажите ширину', '' ) + 'px';
        p.style.background = prompt( 'Укажите фоновый цвет', '' );
        p.style.fontSize = prompt( 'Укажите размер шрифта', '' ) + 'px';
        document.body.prepend(p);
    }

};

let elements = new DomElement ();

elements.createElem();