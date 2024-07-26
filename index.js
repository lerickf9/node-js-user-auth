//Importar las dependencias
import express, { response } from 'express'
//puerto para levantar el serrvidor
import { PORT } from './config.js'
import { UserRepository } from './user-repository.js'

//Crear la aplicación
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>Hello Erick, Bienvenido!</h1>')
})

app.post('/login', (req, res)=> {
    //res.json({ user: 'Erick'})
}) 

app.post('/register', (req, res)=> {
    const { username, password } = req.body // ???
    console.log(req.body)

    try{
        const id = UserRepository.create({ username, password})
        res.send({ id })
    }catch ( error ){
        res.status(400).send(error.message)
    }
})

app.post('/logout', (req, res)=> {})

app.post('/protected', (req, res)=> {})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})