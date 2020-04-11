const mongoose = require('mongoose')

const validator = require('validator')

const companydetailSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        validator: (value) => {
            if (!validator.isEmail(value)) {
                throw new Error({ error: 'Invalid email address'})
            } 
        }
    },
    header:{type: String},
    pattern:{type: String},
    salary: Number,
    location:{type: String},
    dayoff:String ,
    Worktime: {
        startWork:String,
        endWork:String
    },
    role: {},
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    age: Number,
    education: String,
    experience: String

})

//.model(export-name, schema, collection-name)
module.exports = mongoose.model('company', companydetailSchema)