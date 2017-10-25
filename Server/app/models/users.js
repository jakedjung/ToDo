var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var UserSchema = new Schema({
    firstName:{ type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String, required:true, unique: true},
    password: { type: String},
    dateRegistered: { type: Date, default: Date.now},
    status: { type: Boolean, default: true }
});

UserSchema.virtual('fullName')
.get(function () {
    return this.firstName + ' ' + this.lastName;
});


module.export = Mongoose.model('User', UserSchema)