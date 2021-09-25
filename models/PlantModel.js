const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const ObjectId = Schema.ObjectId;

// Need to add images to the schema somehow, I think it will require local storage of the images
// on the server, and the server can simply return the image file as part of a request
// look into it more, probably will use something like res.sendFile(filepath) in the .get function

const PlantData = new Schema({
   objectId: ObjectId,
    name: [{ type: String, trim: true}],
    description: String,
    imageURLs: [{ type: String}],
    light: String,
    lightNum: Number,
    water: String,
    waterNum: Number,
    phNum: Number,
    germination: String,
    disease: [{ type: String}],
    diseaseDescription: [{ type: String}],
    diseaseTreatment: [{ type:String}],
    resistantStrains: [{ type: String}]
});


const Plant = mongoose.model("Plant", PlantData, 'plantae');
module.exports = Plant;
