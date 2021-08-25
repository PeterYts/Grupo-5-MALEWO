const express = require('express');
const app = express();
var path = require("path");
app.use(express.static('public'));
var users = require('./routes/users')
var indexRouter = require("./routes");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use('/', users)
app.use("/", indexRouter);
// app.use(app.router);
// routes.initialize(app);


app.listen(process.env.PORT || 3050, ()=>{
    console.log('Servidor funcionando')
})



app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html');
});



app.get('/compras', (req, res) => {
    res.sendFile(__dirname + '/views/compras.html');
});

app.get('/product', (req, res) => {
    res.sendFile(__dirname + '/views/product-detail.html');
});

app.get('/compras-model', (req, res) => {
    res.sendFile(__dirname + '/views/compras-model.html');
});
app.get('/info', (req, res) => {
    res.sendFile(__dirname + '/views/quienes-somos.html');
});

app.get('/blog', (req, res) => {
    res.sendFile(__dirname + '/views/blog.html');
});





module.exports = app;