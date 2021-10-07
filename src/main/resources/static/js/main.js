let resource = Vue.resource('/library');


Vue.component('book-row', {
    props: ['book'],
    template: '<div>{{ book.id }}  {{ book.author }}  {{ book.name }}  {{ book.publicationYear }}  {{ book.pages }}</div>'

})

Vue.component('books-list', {
    props: ['books'],
    template: '<div><book-row v-for="book in books" :key="book.id" :book="book"/></div>'
});

let app = new Vue({
    el: '#app',
    template: '<books-list :books="books" />',
    data: {
        books: [
            {id: '1', author: 'Стивен Кинг', name: 'Мизери',publicationYear: '1990', pages: '300'},
            {id: '2', author: 'Пушкин', name: 'Книга 1',publicationYear: '1500', pages: '20'},
            {id: '3', author: 'Толстой', name: 'Книга 2',publicationYear: '2000', pages: '2102'}
        ]
    }
});