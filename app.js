const express = require('express');
const session = require('express-session')
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')
const app = express();
const path = require("path");
const users = require('./routes/users');
const indexRouter = require("./routes");
const productRouter = require('./routes/product');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



app.use(methodOverride('_method'));
app.use(session({ 
    secret: 'shhh, its a secret',
    resave: false,
    saveUninitialized:false,   
}))
app.use(userLoggedMiddleware)
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/', users);
app.use("/", indexRouter);
app.use('/products', productRouter );

// app.use(app.router);
// routes.initialize(app);


app.listen(process.env.PORT || 3050, ()=>{
    console.log('Servidor funcionando')
})







module.exports = app;