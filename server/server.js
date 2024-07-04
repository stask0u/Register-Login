const express = require('express');
const app = express();
const cors = require('cors')
const connectDB = require('./routes/mongodb')
const users = require('./routes/users')
const path = require('path');


app.use(express.json())
app.use(cors())


connectDB();

app.use('/images', express.static(path.join(__dirname, '/')));

app.use('/user',users)


app.listen('5000', ()=>{console.log("Listening on port 5000")})
