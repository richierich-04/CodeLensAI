require('dotenv').config()

const app = require('./src/app');

app.listen(3000, () => {              //starts the server
    console.log('Server is running on http://localhost:3000') 
    //whatever is inside the callback, it runs inside the server when it starts and can handle requests
})