const mongoose = require('mongoose');
const User = mongoose.model('User');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = 'MySecret123'; // Change this to anything you want to generate Secret Token


exports.secret = secret;


module.exports.login = (req, res, next) => {
    // Login for user
    // console.log(req.body.username);
    // const username = req.body.password;
    // console.log("Email=="+email);
    // const pwd =req.body.password;
    // console.log("Login working");
    let promise = User.findOne({username: req.body.username}).exec();

    promise.then( doc => {
        if(doc){
            //Bcrypt.compareSync(request.body.password, user.password)) 
                
            
            
            if(bcrypt.compareSync(req.body.password,doc.password)) {
                //generate Toke that expires in 4h
                let token = jwt.sign({username: doc.username}, secret ,{expiresIn: '4h'})
                console.log("Generate Token "+token);
                return res.status(200).json({token: token});
            } else {
                return res.status(500).send('Password Does Not Match')
            }
        }
        else {
            return res.status(500).send('Username does not exists');
        }
    });

    promise.catch( err =>{
        res.status(501).send('Some Internal Error Occured');
    });
}

module.exports.register =   (req,res,next) => {
    var user = new User();
    console.log("body=="+req.body.username);
    //user.fullname = req.body.fullname;
    user.username = req.body.username;
   
    user.email = req.body.email;
    //user.password = req.body.password;
    user.password = bcrypt.hashSync(req.body.password, 10);
    user.save((err,doc) => {   

        if(!err){
            console.log('Saved');
            res.send(doc);
        }
        else{
        
            if(err.code == 11000) // Duplicate Email address
                res.status(422).send(['Duplicate Username Found']);
                else
                   return next(err);
        }
    })
}

module.exports.username = (req, res, next) => {
    console.log("username");
     const sentToken = req.query.token;
         jwt.verify(sentToken, secret, (err, tokendata) => {
        if(err){
            return res.status(500).json({message:'Unauthorized Access'+sentToken});
        }
        if(tokendata) {
            decodedToken = tokendata ;
            return res.status(200).json({message:decodedToken.username});
            //next();
        }
    });
}

