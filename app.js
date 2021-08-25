const express = require('express');
const app = express();
var path = require("path");
app.use(express.static('public'));
var users = require('./routes/users')
var indexRouter = require("./routes");
var product = require('./routes/product')
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use('/', users)
app.use("/", indexRouter);
app.use('/', product )
// app.use(app.router);
// routes.initialize(app);


app.listen(process.env.PORT || 3050, ()=>{
    console.log('Servidor funcionando')
})







module.exports = app;