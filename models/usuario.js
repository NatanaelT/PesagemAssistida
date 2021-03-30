const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

const usuarioSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: Number,
        required: true,
        unique: true
        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    telefone: {
        type: Number,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('Usuario', usuarioSchema)
usuarioSchema.plugin(uniqueValidator);