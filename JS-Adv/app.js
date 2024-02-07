// document.body.children[1].children[0].href = 'https://google.com';

// console.dir(document);
// alert();
// window.alert();

let anchorElement = document.getElementById('external-link');
anchorElement.href = 'https://google.com';


// css selector - class, id, tag
anchorElement = document.querySelector('#external-link');
anchorElement.href = 'https://youtube.com';

// will give the first element that matches the query
anchorElement = document.querySelector('a'); // ('p a')
anchorElement.href = 'https://youtube.com';

// querySelectorAll() - to fetch all matching elements and 
//                      not just a single element like querySelector

// document.getElementById('some-id'): Select a HTML element by its ID (selects only one element, since IDs should be unique)

// document.querySelector('<some-css-selector>'): Selects the first matching (!) HTML element that is met / selected by the provided CSS selector; The CSS selector can basically be any kind of valid CSS selector (e.g. ID selector, tag type selector, class selector, combined selectors etc.)

// document.querySelectorAll('<some-css-selector>'): Selects ALL matching HTML elements that are met / selected by the provided CSS selector

// There also are a few lesser used selection methods, that you also should've heard about:

// document.getElementsByClassName('some-css-class'): Selects all HTML elements that have the provided CSS class

// document.getElementsByTagName('tag'): Selects all HTML elements that are of the provided HTML tag type
