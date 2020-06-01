const jwt = require('jsonwebtoken');

exports.miniumPermissionLevelRequired = (require_permission_level) => {
    return (req, res, next) => {
        let user_permission_level = parseInt(req.jwt.permission);
        if(user_permission_level <= require_permission_level){
            return next();
        }
        else{
            return res.status(403).send({"error": "permission is denied"});
        }
    }
} 

exports.specificUserRequired = (req, res, next) => {
    let userId = req.jwt.userId;
    if(req.params.id == userId){
        return next();
    }
    else{
        res.status(403).send({"error": "permission is denied"});
        return;
    }
}