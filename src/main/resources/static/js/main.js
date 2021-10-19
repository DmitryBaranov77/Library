let resource = Vue.resource('/library');

Vue.component('book-form', {
    props: ['books', 'bookAttr'],
    data: function () {
        return {
            id: '',
            author: '',
            name: '',
            publicationYear: '',
            pages: ''
        }
    },
    watch: {
        bookAttr: function(newValue){
            this.id = newValue.id;
            this.author = newValue.author;
            this.name = newValue.name;
            this.publicationYear = newValue.publicationYear;
            this.pages = newValue.pages;
        }
    },
    template:
        '<div>' +
        '<input type="text" placeholder="Author" v-model="author">' +
        '<input type="text" placeholder="Name" v-model="name">' +
        '<input type="text" placeholder="Year of publication" v-model="publicationYear">' +
        '<input type="text" placeholder="Pages" v-model="pages">' +
        '<input type="button" value="Save" @click="save" />' +
        '</div>',
    methods: {
        save: function () {
            if(this.id){
                let book = {id: this.id, author: this.author, name: this.name, publicationYear: this.publicationYear, pages: this.pages};
                resource.update({}, book).then(result =>
                    result.json().then(data => {
                        this.books.splice(data.id-1, 1, data);

                        this.id = '';
                        this.author = '';
                        this.name = '';
                        this.publicationYear = '';
                        this.pages = '';

                    })
                )
            }else {
                let book = {author: this.author, name: this.name, publicationYear: this.publicationYear, pages: this.pages};
                resource.save({}, book).then(result =>
                    result.json().then(data => {
                        this.books.push(data);

                        this.author = '';
                        this.name = '';
                        this.publicationYear = '';
                        this.pages = '';
                    })
                );
            }
        }
    }
});


Vue.component('book-row', {
    props: ['book', 'editMethod', 'books'],
    template:
        '<div> ' +
            '(<b>{{ book.id }}</b>) <i>{{ book.author }}</i>  {{ book.name }}  {{ book.publicationYear }}г.  {{ book.pages }}стр.' +
            '<span style="position: absolute; right: 0">' +
                '<div>'+
                    '<input type="button" value="Edit"  @click="edit"/>' +
                    '<input type="button" value="Delete"  @click="del"/>' +
                '</div>'+
            '</span>' +
        '</div>',
    methods: {
        edit: function () {
            this.editMethod(this.book);
        },
        del: function (){
            resource.remove({}, this.book).then(result =>{
                if(result.ok){
                    this.books.splice(this.books.indexOf(this.book), 1);
                }
            })
        }
    }
})

Vue.component('books-list', {
    props: ['books'],
    data: function () {
        return {
            book: null
        }
    },
    template:
        '<div style="position: relative; width: 760px">' +
        '<book-form :books="books" :bookAttr="book"/>' +
        '<book-row v-for="book in books" :key="book.id" :book="book" :editMethod="editBook" :books="books"/>' +
        '</div>',
    methods: {
        editBook: function (book) {
            this.book = book;
        }
    }

});

let app = new Vue({
    el: '#app',
    template: '<books-list :books="books" />',
    data: {
        books: [],
    },
    created: function () {
        resource.get().then(resultList =>
            resultList.json().then(data => {
                    data.forEach(book => this.books.push(book));
                    console.log(data)
                }
            ))
    }
});