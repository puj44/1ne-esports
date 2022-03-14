const jwt=require('jsonwebtoken');
const key='09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611';
function verifyToken(req, res, next) {
    const token = req.cookies.token1;
    if (!token)
      return res.status(403).send('No token provided.');
      
    jwt.verify(token, key, function(err, decoded) {
      if (err)
        return res.status(500).send('Failed to authenticate token.');
      next();
    });
}
module.exports=verifyToken;