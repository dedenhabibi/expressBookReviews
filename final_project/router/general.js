const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Check if a user with the given username already exists
const doesUserExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

public_users.post("/register", (req, res) => {
    //Write your code here

    const username = req.body.username;
    const password = req.body.password;
    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesUserExist(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User <" + username + "> successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }

    // Return error if username or password is missing
    return res.status(404).json({message: "Username and/or password are not provided. Unable to register user."});

    //return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    //Write your code here
    res.send(JSON.stringify(books, null, 4));
    //return res.status(300).json({ message: "Yet to be implemented" });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    //Write your code here

    const isbn = req.params.isbn;
    res.send(books[isbn]); // isbn here means the dictionary key of the books

    //return res.status(300).json({ message: "Yet to be implemented" });
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    //Write your code here

    const author = req.params.author;

    // Filter the books dictionary for any book with the same author
    let bookswithsameauthor = [];

    for (const [isbn, book] of Object.entries(books)) {
        if (book.author === author) bookswithsameauthor.push(book);
    }

    // Response with list of books if there are books with the same author found, otherwise return "No book with the author's name"
    if (bookswithsameauthor.length > 0) {
        res.send(bookswithsameauthor);
    } else {
        res.status(400).json({ message: "No book authored by " + author + " found."});
    }

    //return res.status(300).json({ message: "Yet to be implemented" });
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    //Write your code here

    const title = req.params.title;

    // Filter the books dictionary for any book with the same title
    let bookswithsametitle = [];

    for (const [isbn, book] of Object.entries(books)) {
        if (book.title === title) bookswithsametitle.push(book);
    }

    // Response with list of books if there are books with the same title found, otherwise return "No book with that title"
    if (bookswithsametitle.length > 0) {
        res.send(bookswithsametitle);
    } else {
        res.status(400).json({ message: "No book titled '" + title + "' found."});
    }


    // return res.status(300).json({ message: "Yet to be implemented" });
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    const isbn = req.params.isbn;
    res.send(books[isbn].reviews);
    //return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.general = public_users;
