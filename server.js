const express = require('express');
const bodyParser = require('body-parser');
const {User, UserPers} = require('./db_connection');
const routes = require('./route/route.config');

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}


const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

routes(app);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

const port = 3000
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
});


