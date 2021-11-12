const fs = require('fs'); //file system of web server
const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8')); //do not do in production website - expensive; better to do at startup, read file once, cache it

/* GET travel view */
const travel = (req, res) => {
    pageTitle = process.env.npm_package_description + ' - Travel';
    res.render('travel', { title: pageTitle, trips});
};

module.exports = {
    travel
};