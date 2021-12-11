const path = require('path')

const indexController = {
    home: (req, res) => {
      res.render("index");
    },
    productos : (req,res) => {
        res.render ('products')
    },
    info: (req, res) => {
        res.render('quienes-somos');
    },
    blog : (req, res) => {
        res.render('blog');
    },
    dashboard: (req, res) => {
        res.sendFile(path.join(__dirname, '../react-dashboard/build/index.html'));
    }
}

module.exports = indexController