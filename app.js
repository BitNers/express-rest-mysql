const exp = require('express');
const app = exp();
const bodyparser = require('body-parser');
require("dotenv-safe").config();

let port = 3000

app.use(bodyparser.json());


require('./routes/route')(app);

app.listen(port, ()=>{
    console.log(`Running in http://127.0.0.1:${port}`)
});