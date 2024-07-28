import crypto from 'node:crypto'
import { SALT_ROUNDS } from './config.js'

import DBLocal from 'db-local'
import bcrypt from 'bcrypt'

const { Schema } = new DBLocal({ path: '.db' })

const User = Schema('User',{
    _id: { type: String, required: true},
    username: { type: String, required: true},
    password: { type: String, required: true}
})

//
export class UserRepository {
    static async create({ username, password}) {
        // 1. validaciones de username (opcional: usar zod)
        Validation(username)
        Validation(password)

        //2. ASEGURARSE QUE EL USERNAME NOOO EXISTE
        const user = User.findOne({ username})
        if(user) throw new Error('Username already exists')

        const id = crypto.randomUUID()
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS) // hashSync -> bloquea el thread principal
        
        User.create({
            _id: id,
            username,
            password: hashedPassword
        }).save()

        return id

    }
    static async login({ username, password}) {
        Validation.username(username)
        Validation.password(password)

        //Buscamos el usuario
        const user= User.findOne({ username })
        if(!user) throw new Error('username does not exist')
            
        const isValid = await bcrypt.compareSync(password, user.password) //hace una comparacion del password pasado con el password hasheado.
        if(!isValid) throw new Error('password is invalid')
        
        //Creamos un objeto desde 0 pero sin el password y no mostrarlo en el servidor
        const{ password: _, ...publicUser } = user
        
        return publicUser

    }
}
    class Validation{
        static username(username){
            if(typeof username != 'string' ) throw new Error('username must be a string')
            if(username.length < 3) throw new Error( 'password must be at least 3 characters long')
        }

        static password(password){
            if(typeof password != 'string' ) throw new Error('username must be a string')
            if(password.length < 6) throw new Error( 'password must be at least 6 characters long')
        }
    }

