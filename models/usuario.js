const mongoose = require('mongoose')

const usuarioSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    funcao: {
        type: String,
        required: true
    },
    cpf: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        select: false,
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