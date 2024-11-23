const axios = require('axios');

const getBookByTitle = (title) => {
    axios.get('https://dedenhabibi-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/title/'+title)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error fetching book:', error);
    });
};

getBookByTitle("The Divine Comedy"); // get "The Divine Comedy" book
