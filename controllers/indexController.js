const indexController = {
    home: (req, res) => {
      res.render("index");
    },
    productos : (req,res) => {
        res.render ('products')
    },
    login : (req,res) => {
        res.render ('login')
    }
}

module.exports = indexController