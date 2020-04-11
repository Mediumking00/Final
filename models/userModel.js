const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const validator = require('validator')
 

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        // validator: (value) => {
        //     if (!validator.isEmail(value)) {
        //         throw new Error({ error: 'Invalid email address'})
        //     } 
        // }
    },
    password:{
        type: String,
        required: true,
        minlength: 6, //hashed password
    },
})

// Schema-level middleware  / work when user going to save & if the code have 'this' don't use arrow fuction
userSchema.pre('save',async function(next) {
    const user = this
    if (user.isModified('password')) {
        // salt+hash encryption
        user.password = await bcrypt.hash('user.password, 10')
    }

    //continue with save
    next()
})

userSchema.method.generateAuthToken = async function(){
    const user = this
    const payload = {
        _id: user._id,
        email: user.email,
    }

    const token = jwt.sign(payload,process.env.TOKEN_KEY,
                            {
                                expiresIn: '2h',
                                issuer: 'Awesome API v3'
                            })

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.static.findByCredentials = async (email,password) => {
    try {
        const user = await User.findOne( {email})
        if(!user){
            throw new Error()
        }

        // compare provideed 'password' with hashed 'user.password'
        const isPasswordMatch = await bcrypt.compare(password ,user.password)
        if(!isPasswordMatch){
            throw new Error()
        }

        return user

    } catch (error) {
        return null 
    }
}



const User = mongoose.model('User', userSchema)
module.exports = User