var mongoose = require('mongoose');
var Schema = mongoose.Schema;

contactSchema = new Schema({
    fullname: String,
    phonenumber: String,
    email: String,
    message: String
});
Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;