require('./config/config');
require('./models/db');

const express = require('express');
const bodyparser =  require('body-parser');
const cors = require('cors');

const rtsIndex = require('./routes/index.router');
var app = express();
//middleware
//app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyparser.json())

// to enbale communicatin express with angular which are running on different ports we need cors

app.use(cors());
app.use('/api',rtsIndex);

app.use((err,req,res,next) => {
    console.log("NXT on errors");
    console.log(err.name);
    if(err.name === 'ValidationError') {
        console.log("Im here");
        //Name propert inside error object
        var valErrors = [];
        Object.keys(err.errors).forEach(key =>{ 
            valErrors.push(err.errors[key].message);
            console.log("looping\n");}
        );
        res.status(422).send(valErrors);
        
    };
});
// to use routes like /api/register

app.listen(process.env.PORT , () => {
    console.log(`Server Started at port: ${process.env.PORT}`);
});
