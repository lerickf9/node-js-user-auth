//Importar las dependencias
import express, { response } from 'express'
//puerto para levantar el serrvidor
import { PORT } from './config.js'

//Crear la aplicación
const app = express()


app.get('/', (req, res) => {
    res.send('<h1>Hello Erick, Bienvenido!</h1>')
})

app.post('/login', (req, res)=> {
    //res.json({ user: 'Erick'})
}) 

app.post('/register', (req, res)=> {})
app.post('/logout', (req, res)=> {})

app.post('/protected', (req, res)=> {})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})