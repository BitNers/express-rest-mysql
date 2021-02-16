const exp = require('express');
const app = exp();
const bodyparser = require('body-parser');
const cookies = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const expressLayouts = require('express-ejs-layouts')
const compression = require('compression');

const dbConfig = require('./database/db.config')

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

require('dotenv').config();


app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('views', path.join(__dirname, '/views'));
app.use(exp.static(__dirname + '/node_modules'));
// app.use(exp.static(__dirname+'/public')); Mix Webpack? Maybe


// Cache for EJS 
// LRU = require('lru-cache');
// ejs.cache = LRU(100);

app.use(compression(9)); // -1 -- 9 -> Lower is better for weak computers.
app.use(bodyparser.json({limit: '50mb'}));
app.use(cookies());
app.use(helmet());
app.use(cors());
app.disable('x-powered-by');

var sessionStore = new MySQLStore({
	host: dbConfig.HOST,
	port: 3306,
	user: dbConfig.USER,
	password: dbConfig.PASSWORD,
	database: dbConfig.DB,
    schema: {
		tableName: 'sessions_users',
		columnNames: {
			session_id: 'id_session',
			expires: 'expiresIn',
			data: 'sessiondata'
		}
	}
});

app.use(session({
    key: process.env.SESSION_KEY,
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false // Don't Forget to Add Secure Cookie in HTTPS
}));

require('./routes/home.route')(app);
require('./routes/user.route')(app);

app.listen(process.env.PORT, ()=>{console.log(`Running in http://127.0.0.1:${process.env.PORT}`)});