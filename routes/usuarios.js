var express = require('express');
var router = express.Router();
const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt')

//getting all
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find().select('-__v')
        res.json(usuarios)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// //getting one
router.get('/:cpf', getUsuario, (req, res) => {
    res.json(res.usuario)
})

//creating one
router.post('/', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const usuario = new Usuario({
        nome: req.body.nome,
        funcao: req.body.funcao,
        cpf: req.body.cpf,
        email: req.body.email,
        password: hashedPassword,
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
router.patch('/:cpf', getUsuario, async (req, res) => {
    console.log(req.body)
    if (req.body.nome != null)
        res.usuario.nome = req.body.nome
    if (req.body.cpf != null)
        res.usuario.cpf = req.body.cpf
    if (req.body.email != null)
        res.usuario.email = req.body.email
    if (req.body.password != null) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        res.usuario.password = hashedPassword
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
router.delete('/:cpf', getUsuario, async (req, res) => {
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
        console.log('1')
        usuario = await Usuario.findOne({ cpf: req.params.cpf })
        if (usuario == null) {
            console.log('2')
            return res.status(404).json({ message: 'Usuario não encontrado' })
        }
    } catch (err) {
        console.log('3')
        return res.status(500).json({ message: err.message })
    }
    console.log('4')
    res.usuario = usuario
    next()
}

module.exports = router
