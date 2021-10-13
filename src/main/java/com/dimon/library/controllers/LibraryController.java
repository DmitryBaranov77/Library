package com.dimon.library.controllers;

import com.dimon.library.dao.BookDao;
import com.dimon.library.models.Book;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("library")
public class LibraryController {

    private BookDao bookDao;

    public LibraryController(BookDao bookDao) {
        this.bookDao = bookDao;
    }

    @PostMapping
    public Book addNewBook(@RequestBody Book book){
        bookDao.save(book);
        return bookDao.findById(book.getId()).get();
    }

    @GetMapping
    public List<Book> showBooks(){
        return bookDao.findAll();
    }

    @PutMapping()
    public Book update(@RequestBody Book book){
        bookDao.save(book);
        return bookDao.findById(book.getId()).get();
    }

    @DeleteMapping()
    public void delete(@RequestBody Book book){
        bookDao.delete(book);
    }
}
