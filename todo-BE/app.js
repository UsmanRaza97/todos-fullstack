const bodyParser = require('body-parser');
const express = require('express');
const mongoose=require('mongoose');
const cors = require('cors')
require('dotenv').config();


var app=express();
const PORT = process.env.PORT||3000;
    
mongoose.connect(process.env.MONGO_URI,{dbName:'todo_list'})

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(cors());

app.use('/todo',require("./routes/todo"))

app.listen(PORT,console.log(`listening at ${PORT}`))
