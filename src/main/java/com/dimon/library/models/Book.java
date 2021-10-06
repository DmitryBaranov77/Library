package com.dimon.library.models;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Entity
@Table(name  = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String author;
    private String name;
    private String publicationYear;
    private String pages;

    public Book(String author, String name, String publicationYear, String pages) {
        this.author = author;
        this.name = name;
        this.publicationYear = publicationYear;
        this.pages = pages;
    }
}
