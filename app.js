//Express Core
const exp = require('express');
const app = exp();

// Body and Cookie Parser
const bodyparser = require('body-parser');
const cookies = require('cookie-parser');

// Security and optimization
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const LRU = require('lru-cache');
// Database & Sessions
const dbConfig = require('./database/db.config')
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

// Views
let ejs = require('ejs');
ejs.cache = new LRU(100);
const expressLayouts = require('express-ejs-layouts')

// Utilities
const path = require('path');
require('dotenv').config();


app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('views', path.join(__dirname, '/views'));
app.use(exp.static(__dirname + '/node_modules'));
app.use('*/public', exp.static(__dirname+'/public')); 

app.use(compression(9)); // -1 -- 9 -> Lower is better for weak computers.
app.use(bodyparser.urlencoded({ extended: false }))
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

// Adding this tiny middleware to get Session Info and pass through View to make conditionals CSS buttons
app.use((req, res, next)=>{
	res.locals.email = req.session.email;
    next();
})
require('./routes/guest.route')(app);
require('./routes/user.route')(app);

app.listen(process.env.PORT, ()=>{console.log(`Running in http://127.0.0.1:${process.env.PORT}`)});