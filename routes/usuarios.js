var express = require('express');
var router = express.Router();
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')
const passport = require('passport')
const initializePassport = require('../passport-config')

initializePassport(
    passport,
    cpf => { user => Usuario.find({cpf: cpf}) },
    id => { user => Usuario.find({id: id}) }
)

//getting all
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find()
        res.json(usuarios)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// //getting one
router.get('/:id', getUsuario, (req, res) => {
    res.json(res.usuario)
})

//creating one
router.post('/', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.senha, 10)
    const usuario = new Usuario({
        nome: req.body.nome,
        funcao: req.body.funcao,
        cpf: req.body.cpf,
        email: req.body.email,
        senha: hashedPassword,
        telefone: req.body.telefone,
        isAdmin: req.body.isAdmin
    })
    try {
        const novoUsuario = await usuario.save()
        res.status(201).json(novoUsuario)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// //updating one
router.patch('/:id', getUsuario, async (req, res) => {
    if (req.body.nome != null)
        res.usuario.nome = req.body.nome
    if (req.body.funcao != null)
        res.usuario.funcao = req.body.funcao
    if (req.body.cpf != null)
        res.usuario.cpf = req.body.cpf
    if (req.body.email != null)
        res.usuario.email = req.body.email
    if (req.body.senha != null){
        const hashedPassword = await bcrypt.hash(req.body.senha, 10)
        res.usuario.senha = hashedPassword
    }
    if (req.body.telefone != null)
        res.usuario.telefone = req.body.telefone
    if (req.body.isAdmin != null)
        res.usuario.isAdmin = req.body.isAdmin

    try {
        const usuarioAtualizado = await res.usuario.save()
        res.json(usuarioAtualizado)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//deleting one
router.delete('/:id', getUsuario, async (req, res) => {
    try {
        await res.usuario.remove()
        res.json({ message: 'Usuario removido' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

})

async function getUsuario(req, res, next) {
    let usuario
    try {
        usuario = await Usuario.findById(req.params.id)
        if (usuario == null) {
            return res.status(404).json({ message: 'Usuario não encontrado' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.usuario = usuario
    next()
}

module.exports = router
