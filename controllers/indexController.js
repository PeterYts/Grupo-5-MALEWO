const indexController = {
    home: (req, res) => {
      res.render("index");
    },
    productos : (req,res) => {
        res.render ('products')
    },
    login : (req,res) => {
        res.render ('login')
    },
    compras : (req, res) => {
        res.render('compras');
    },
    info: (req, res) => {
        res.render('quienes-somos');
    },
    blog : (req, res) => {
        res.render('blog');
    }
}

module.exports = indexController