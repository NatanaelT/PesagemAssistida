const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialize(passport, getUserByCpf, getUserById) {
    const authenticateUser = async (cpf, senha, done) => {
        const user = getUserByCpf(cpf)
        if (user == null) {
            return done(null, false, { message: 'Usuario não encontrado' })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Senha não encontrado' })
            }
        } catch (e) {
            return done (e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'cpf', passwordField: 'senha' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
       return done(null, getUserById(id)) 
    })
}

module.exports = initialize