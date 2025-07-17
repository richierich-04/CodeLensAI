const express = require('express');
const aiRoutes = require("./routes/ai.routes")
const app = express()
const cors = require('cors')

app.use(cors())

//middleware
app.use(express.json());

//test route
app.get('/', (req, res) => {
    res.send('Hello World')
})                                       //to check if our server is running

app.use('/ai', aiRoutes);

module.exports = app; 