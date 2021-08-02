import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

constObjectId = Schema.ObjectId;

// Need to add images to the schema somehow, I think it will require local storage of the images
// on the server, and the server can simply return the image file as part of a request
// look into it more, probably will use something like res.sendFile(filepath) in the .get function
const DiseaseData = new Schema({
    objectId: ObjectId,
    name: [{ type: String}],
    description: String,
    susceptiblePlants: [{ type: String}]
});
