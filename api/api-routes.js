const router = require('express').Router();
const plantModel = require('../models/PlantModel.js');

router.get('/', function (req, res) {
    res.json({
        status: 'API WOW',
        message: 'PlantaeTaxa placeholder',
    });
});



// This function will return ALL plants in the database
//
router.get('/plantae/getall', async (req, res) => {
    const plants = await plantModel.find({});
    try {
        res.send(plants);

    } catch (err) {
        res.status(500).send(err);
    }
});

// This function will find specific plants by name
// Request query does this based on a name argument

router.get('/plantae/find/name', async (req, res) => {
    try {
        //plants = await plantModel.find( req.query );
        plants = await plantModel.find({ name: req.query.name});
        res.send(plants);
    } catch (err) {
        res.status(500).send(err);
    }
});



// This function will find plants using a fuzzy search on the name
router.get('/plantae/find/fuzzyname', async (req, res) => {
    console.log(req);
    plantModel.aggregate([{
            $search: {
                compound:{
                    should: [{
                        "text": {
                            "path" : "name",
                            "query": req.query.name,
                            "fuzzy": {
                                "maxEdits": 2,
                                "maxExpansions": 10
                            }
                        }
                    },{
                        "wildcard": {
                            "path" : "name",
                            "query": "*"+req.query.name+"*",
                            "allowAnalyzedField": true
                        }
                    }]
                }
            }
        },
    ], function (err, data) {
        if (err) {
            res.status(500).send(err);
            console.log("*** Error during fuzzy search by name:");
            console.log(err);
        } else {
            res.status(200).send(data);
            console.log(data);
        }
    }).limit(50);
});

// This function will find a plant entry based on ID
//
router.get('/plantae/find/id', async (req, res) => {
    try {
        plant = await plantModel.findById(req.query.id);
        res.send(plant);
    } catch (err){
        res.status(500).send(err);
    }
});

// This function will add a new plant entry
// With the values sent in the request query
// TODO: it should probably check to see if a plant with the exact
//          name already exists so it doesn't create duplicates
//
router.post('/plantae/create', async (req, res) => {
    const plant = new plantModel(req.body.plant);
    console.log("Creating new plant");
    try {
        await plant.save();
        res.send(plant);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


// This function will update/modify an existing plant entry
// Which entry is modified is done using object ID 
// As it needs to be unique
//
router.patch('/plantae/update', async (req, res) => {
    try {
        await plantModel.findByIdAndUpdate(req.body.plant._id, req.body.plant);
        plant = await plantModel.findById(req.body.plant._id);
        console.log(plant);
        res.send(plant);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// This function will delete a plant by ID
//router.delete('plantae

module.exports = router;
