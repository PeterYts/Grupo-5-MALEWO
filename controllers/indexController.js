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
    }
}

module.exports = indexController