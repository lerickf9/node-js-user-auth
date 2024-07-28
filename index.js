//Importar las dependencias
import express, { response } from 'express'
//puerto para levantar el serrvidor
import { PORT } from './config.js'
import { UserRepository } from './user-repository.js'

//Crear la aplicación
const app = express()

//Ocupamos una plantilla
app.set('view engine', 'ejs')

app.use(express.json())

app.get('/', (req, res) => {
    res.render('example', { username: 'Erick'})
})

app.post('/login', async (req, res)=> {
    //res.json({ user: 'Erick'})
    const { username, password} = req.body

    try{
        const user = await UserRepository.login({ username, password})
        res.send({ user })
    }catch (error){
        res.status(401).send(error.message)
    }

}) 

app.post('/register', async (req, res) => {
    const { username, password } = req.body // ???
    console.log({ username, password })

    try{
        const id = await UserRepository.create({ username, password})
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