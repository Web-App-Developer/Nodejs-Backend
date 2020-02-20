var jwt = require('jsonwebtoken');
module.exports = {
    verifytoken : function(req,res,next) {
         const sentToken = req.query.token;
         jwt.verify(sentToken, secret, (err, tokendata) => {
        if(err){
            return res.status(501).json({message:'Unauthorized Access'});
        }
        if(tokendata) {
            decodedToken = tokendata ;
            console.log("Token data");
            //next();
        }
    });
    }
}