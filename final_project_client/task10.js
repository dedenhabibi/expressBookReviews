const axios = require('axios');

// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getBooks() {
  try {
    const response = await axios.get('https://dedenhabibi-5000.theianext-1-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

getBooks();