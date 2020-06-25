const jwt = require('jsonwebtoken');
const UserController = require('./UserController');

exports.refreshToken = async(req, res)=>{
    if(req.headers['authorization'])
    {
        try{
            let authorization = req.headers['authorization'].split(' ');
            if(authorization[0] !== 'Bearer'){
                return res.status(401).send({'error': 'Invalid request'});
            }
            let jwts = await jwt.verify(authorization[1], process.env.SECRET_KEY, {
                ignoreExpiration: true,
            });
            let {refreshToken} = jwts;
            await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
            let newRefreshToken = jwt.sign({
                'userId': jwts.userId,
                'username': jwts.username,
                'password': jwts.password,
                'permission': jwts.permission
            }, process.env.REFRESH_TOKEN_SECRET_KEY, {
                expiresIn: process.env.REFRESH_TOKEN_LIFE,
            });
            let newToken = jwt.sign({
                'userId': jwts.userId,
                'username': jwts.username,
                'password': jwts.password,
                'permission': jwts.permission,
                'refreshToken': newRefreshToken,
            }, process.env.SECRET_KEY, {
                expiresIn: process.env.TOKEN_LIFE,
            });
            res.status(200).json({
                "refresh token": newRefreshToken,
                "access token": newToken
            });
        }catch(err){
            return res.status(403).json(err);
        }
    }
}