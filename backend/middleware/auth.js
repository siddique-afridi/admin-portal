

const jwt = require ('jsonwebtoken');


const auth = (req,res,next) =>  {

const authHeader = req.headers['authorization'];

 if(!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({error:"Access Denied"})
 }

 const token = authHeader.split(" ")[1];

 try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
 }
 catch(err){
    return res.status(403).json({error: "invalid or expired token"});
 }

};

module.exports = auth;

// 1 import jwt library
// 2 create arrow function with parameter req,res,next
// 3 read header from the request body
// 4 check if there is token present
// 5 if token is present in header in authorization then split it and get the token part
// 6 verify the token by comparing it with secret key in .env
// 7 then save the decoded or verified in req.user so that specific loggedin user has access to all protected routes.
// 8 apply authenticate to all protected routes to only allow verified loggedin users