const express = require('express');

const path = require('path');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;

const app = express();


//Mongoose Connection
mongoose.connect(process.env.MONGODB_URI);

app.use(express.static(__dirname));

app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'))
});

//Routes Middleware
app.use('/', require('./server/routes'));
 

//Connects to the PORT
app.listen(port, () => {
    console.log('server listening on port 3000');
});