const {User, UserPers} = require('../db_connection');
const bcrypt = require('bcrypt');

exports.isPasswordAndUsernameMatch = async(req, res, next)=>{
    let {username, password} = req.body;
    let permission;
    await User.findOne({
        where: {
            username: username,
        }
    }).then(async user => {
        const match = await bcrypt.compare(password, user.password);
        await UserPers.findOne({
            where: {
                id_user: user.id,
            }
        }).then((pers) => {
            permission = pers.id_pers;
        }).catch(err => res.status(400).json(err.message));
        console.log(permission);
        if(match)
        {
            req.body = {
                userId: user.id,
                username: user.username,
                password: user.password,
                permission: permission,
            }
            return next()
        }
        else
        {
            res.status(400).json("Wrong username or password.");
            return next();
            
        }
    }).catch(err => {
        res.status(500).json(err.message);
        return next();
        
    })
}

exports.hasAuthValidFields = (req, res, next)=>{
    let errors = [];

    if(req.body){
        const {username, password} = req.body;
        if(!username || !password){
            errors.push("Invalid username or password.");
        }

        if(errors.length){
            return res.status(404).json(errors);
        }
        else{
            return next();
        }
    }
    else{
        return res.status(404).json("Missing username and password fields.");
    }
}