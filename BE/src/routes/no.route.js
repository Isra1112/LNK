const noRoute = (req,res) => {
    res.status(404);
    res.json('Page Not Found');
}

module.exports = noRoute;