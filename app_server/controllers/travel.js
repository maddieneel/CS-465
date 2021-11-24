//const fs = require('fs'); //file system of web server
//const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8')); //do not do in production website - expensive; better to do at startup, read file once, cache it

// /* GET travel view */
// const travel = (req, res) => {
//     pageTitle = process.env.npm_package_description + ' - Travel';
//     res.render('travel', { title: pageTitle, trips});
// };

// module.exports = {
//     travel
// };

const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
}

const renderTravelList = (req, res, responseBody) => {
    let message = null;
    let pageTitle = process.env.npm_package_description + ' - Travel';

    if(!(responseBody instanceof Array)){
        message = 'API lookup error';
        responseBody = [];
    } else {
        if(!responseBody.length){
            message = 'No trips exist in database!';
        }
    }

    res.render('travel', {
        title: pageTitle,
        trips: responseBody,
        message
    });
};

const travelList = (req, res) => {
    const path = '/api/trips';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };

    console.info('>> travelController.travelList calling ' + requestOptions.url);

    request(
        requestOptions,
        (err, {statusCode}, body) => {
            if (err){
                console.error(err);
            }
            renderTravelList(req, res, body);
        }
    )
}

module.exports = {
    travelList
};