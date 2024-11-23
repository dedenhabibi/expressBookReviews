const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
    //write code to check is the username is valid
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

const authenticatedUser = (username, password) => { //returns boolean
    //write code to check if username and password match the one we have in records.
    // Filter the users array for any user with the same username and password
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password);
    });
    // Return true if any valid user is found, otherwise false
    if (validusers.length > 0) {
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req, res) => {
    //Write your code here

    const username = req.body.username;
    const password = req.body.password;
    // Check if username or password is missing
    if (!username || !password) {
        return res.status(404).json({ message: "Error logging in" });
    }
    // Authenticate user
    if (authenticatedUser(username, password)) {
        // Generate JWT access token
        let accessToken = jwt.sign({
            data: password
        }, 'access', { expiresIn: 60 * 60 });
        // Store access token and username in session
        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({ message: "Invalid Login. Check username and password" });
    }

    //return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    //Write your code here

    let isbn = req.params.isbn;
    let username = req.session.authorization.username;
    let review = req.query.review;
    
    if (books[isbn]) {
        books[isbn].reviews[username] = review;
        return res.send({ message: "Review by " + username + " to book '" + books[isbn].title + "' has been added/updated." });
    }
    
    return res.status(404).json({ message: "No book with ISBN " + isbn + " to be reviewed"});

    //return res.status(300).json({ message: "Yet to be implemented" });
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
    //Write your code here

    let isbn = req.params.isbn;
    let username = req.session.authorization.username;
    
    if (books[isbn]) {
        if (books[isbn].reviews[username]) {
            delete books[isbn].reviews[username];
            return res.send({ message: "Review by " + username + " to book '" + books[isbn].title + "' has been deleted." });
        } else {
            return res.status(404).json({ message: "No review on book ISBN " + isbn + " by " + username});
        }
    } else {
        return res.status(404).json({ message: "No book with ISBN " + isbn});
    }

    //return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
