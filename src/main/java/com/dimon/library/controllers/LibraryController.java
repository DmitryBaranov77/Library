package com.dimon.library.controllers;

import com.dimon.library.dao.UserDao;
import com.dimon.library.models.User;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LibraryController {

    private UserDao userDao;

    public LibraryController(UserDao userDao) {
        this.userDao = userDao;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public void login(@RequestBody User user){
        userDao.save(user);
    }
}
