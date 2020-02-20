const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if(!err) { console.log (" Connected to Mongo DB");}
    else
    { console.log("Error Occured in Connection" + JSON.stringify(err, undefined , 2));}
}); 

require('./user.model');