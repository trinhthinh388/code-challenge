const {User} = require('../db_connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;


module.exports = {
    get: (req, res)=>{
        User.findAll().then(user => res.json(user));
    },
    detail:(req, res) => {
        let _id = req.params.id;
        User.findOne({
            where: {
                id: _id,
            }
        }).then(user => res.json(user));
    },
    update: async (req, res) => {
        const id = req.params.id;
        let {name, email, password, birthdate} = req.body;
        if(email === null || password === null || password === "" || email === "") {
            res.status(400).json("Validation error");
        }
        password = bcrypt.hashSync(password, saltRounds);
        const transaction  = await User.sequelize.transaction();
        try{ 
            const [numberOfAffectedRows, affectedRows] = await User.update({
                name: name,
                email: email,
                password: password,
                birthdate: birthdate,
            }, {
                where: {id: id},
                returning: true,
                plain: true,
                transaction
            });
            await transaction.commit();
            res.send({'number of affected rows': affectedRows});
        }catch(error){
            await transaction.rollback();
            res.status(400).json(error.message);
        }
        
    },
    create: async (req, res) => {
        let {name, email, username, password} = req.body;
        password = bcrypt.hashSync(password, saltRounds);
        const transaction = await User.sequelize.transaction();
        try{
            await User.create({
                name: name,
                email: email,
                username: username,
                password: password,
            }, {transaction});
            await transaction.commit();
            let user = await User.findOne({
                where: {
                    username: username,
                }
            });
            res.status(400).json(user);
        }
        catch(err){
            if (transaction) await transaction.rollback();
            res.status(400).json(err.message);
        }
        
    },
    delete: async (req, res)=>{
        const _id = req.params.id;
        await User.destroy({
            where: {
                id: _id,
            }
        }).then(()=>{
            res.json("Delete success")
        }).catch((err)=>{
            res.status(400).json(err.message);
        });
    },
    login: async (req, res)=>{
        try{
            let refreshToken = jwt.sign(req.body, process.env.REFRESH_TOKEN_SECRET_KEY, {
                expiresIn: process.env.REFRESH_TOKEN_LIFE,
            });
            req.body.refreshToken = refreshToken;
            let token = jwt.sign(req.body, process.env.SECRET_KEY, {
                expiresIn: process.env.TOKEN_LIFE,
            });
            res.status(200).json({
                "refresh token": refreshToken,
                "access token": token
            });
        }catch(err){
            res.status(500).json(err.message);
        }
        
    },
}