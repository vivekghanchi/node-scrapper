let scrapper = async function(req, res) {
    res.status(200).jsonp("Hello world");
}

module.exports = scrapper;