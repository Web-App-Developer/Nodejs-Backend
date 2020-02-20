const express = require('express');
const router = express.Router();

const ctrluser = require('../controllers/user.controller');
const secret =  ctrluser.secret;


router.post('/register',ctrluser.register);
router.post('/login',ctrluser.login);
router.get('/username',ctrluser.username);
   



// function verifytoken(req, res, next) {
//     const sentToken = req.query.token;
//     jwt.verify(sentToken, secret, (err, tokendata) => {
//         if(err){
//             return res.status(501).json({message:'Unauthorized Access'});
//         }
//         if(tokendata) {
//             decodedToken = tokendata ;
//             console.log("Token data");
//              next();
//         }
//     });
// }
//module.exports = verifytoken;
module.exports = router ;