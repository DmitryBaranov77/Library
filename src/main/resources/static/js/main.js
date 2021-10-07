let resource = Vue.resource('/library');


Vue.component('book-row', {
    props: ['book'],
    template: '<div> {{ book.id }} {{ book.author }}  {{ book.name }}  {{ book.publicationYear }}  {{ book.pages }}</div>'

})

Vue.component('books-list', {
    props: ['books'],
    template: '<div><book-row v-for="book in books" :key="book.id" :book="book"/></div>',
    created: function (){
        resource.get().then(resultList =>
            resultList.json().then(data =>
                data.forEach(book => this.books.push(book))))
    }
});

let app = new Vue({
    el: '#app',
    template: '<books-list :books="books" />',
    data: {
        books: []
    }
});