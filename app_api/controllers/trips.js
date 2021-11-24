const mongoose = require('mongoose'); //access database function
const model = mongoose.model('trips');

// GET : /trips - list all trips
const tripsList = async (req, res) => { 
    model
        .find({})
        .exec((err, trips) => {
            if(!trips) {
                return res
                    .status(404)
                    .json({"message": "trips not found"});
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200) //success
                    .json(trips);
            }
        });
};

// GET : /trips - lists one trip
const tripsFindByCode = async(req, res) => { 
    model
        .find({ 'code' : req.params.tripCode})
        .exec((err, trip) => {
            if(!trip) {
                return res
                    .status(404)
                    .json({"message": "trip not found"});
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200) //success
                    .json(trip);
            }
        });
};

module.exports = {
    tripsList,
    tripsFindByCode
};