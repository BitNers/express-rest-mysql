const exp = require('express');
const app = exp();
const bodyparser = require('body-parser');
const cookies = require('cookie-parser');
require('dotenv').config();

app.use(bodyparser.json());
app.use(cookies());

require('./routes/home.route')(app);
require('./routes/user.route')(app);

app.listen(process.env.PORT, ()=>{
    console.log(`Running in http://127.0.0.1:${process.env.PORT}`)
});