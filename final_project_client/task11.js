const axios = require('axios');

const getBookByISBN = (isbn) => {
    axios.get('https://dedenhabibi-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/isbn/'+isbn)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error fetching book:', error);
    });
};

getBookByISBN(8); // get "Pride and Prejudice"
