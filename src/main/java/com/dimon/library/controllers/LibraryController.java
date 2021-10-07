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
    public void addNewBook(@RequestBody Book book){
        bookDao.save(book);
    }

    @GetMapping
    public List<Book> showBooks(){
        return bookDao.findAll();
    }
}
