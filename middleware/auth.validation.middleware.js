const jwt = require('jsonwebtoken');
exports.validJWTNeeded = (req, res, next) => {
    if(req.headers['authorization']){
        try{
            let authorization = req.headers['authorization'].split(' ');
            if(authorization[0] !== 'Bearer'){
                return res.status(401).send({'error': 'Invalid request'});
            }
            else{
                req.jwt = jwt.verify(authorization[1], process.env.SECRET_KEY);
                console.log(req.jwt);
                return next();
            }
        }catch(err){
            return res.status(403).json(err);
        }
    }else{
        return res.status(401).send({'error': 'Invalid request'});
    }
}

