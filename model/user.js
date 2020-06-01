module.exports = (sequelize, type)=>{
    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
        },
        name: type.STRING,
        email: {
            type: type.STRING,
            validate:{
                isEmail: true,
                // notNull: true,
            }
        },
        phone_number:{
            type: type.STRING,
            validate: {
                is: /(09|01[2|6|8|9])+([0-9]{8})\b/g,
                // notNull: true,
            }
        },
        birthdate: type.DATE,
        username: {
            type: type.STRING,
            validate: {
                // notNull: true,
            }
        },
        password: {
            type: type.STRING,
            validate: {
                // notNull: true,
            }
        },
    });
}