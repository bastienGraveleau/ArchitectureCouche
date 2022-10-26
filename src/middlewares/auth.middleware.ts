const jwt = require('jsonwebtoken');
 
const verifyToken = (req, res, next) => {
   try {
       const token = req.cookies.token.split(' ')[1];
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.redirect('/connexion');
   }
};

module.exports = verifyToken;