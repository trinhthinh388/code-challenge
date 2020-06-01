module.exports = (sequelize, type)=>{
    return sequelize.define('user_pers',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
        },
        id_user: {
            type: type.INTEGER,
        },
        id_pers: {
            type: type.INTEGER,
        }
    });
}