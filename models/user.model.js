const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var userSchema = new mongoose.Schema(
    {
        username: {
                type: String,
                required: 'Please Enter Username',
                 unique : true
        },
        email: {
            type: String,
            required: 'Please Enter Email'
        },
        password: {
            type: String,
            required: 'Please enter password',
            minlength : [ 6, 'Minimum 6 Characters needed for password']
        },
        saltSecret:  String
        
    });

// userSchema.path('email').validate((val) => {
//     var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
//     return re.test(val) ;
//     },
//     'Invalid E-mail');

// userSchema.pre('save', function(next){
//     // bcrypt.genSalt(10, (err, salt) => {
//     //     bcrypt.hash(this.password, salt, (err, hash) => {
//     //         this.password = hash;
//     //         this.saltSecret = salt;
//     //         next();
//     //     });
//     // });
    
// });
mongoose.model('User',userSchema);  // it will save the schema to collection 'Users' -- so plural of what is the first param