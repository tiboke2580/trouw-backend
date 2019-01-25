let mongoose = require("mongoose");

let SessionSchema = new mongoose.Schema({
    title: String,
    image_filename: String,
    description:String
});

mongoose.model('book', SessionSchema);