import express from 'express'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import 'dotenv/config'

// Database Connection
const URI = process.env.MONGO_URI
const client = new MongoClient(URI)
const database = client.db('games-app')
const games = database.collection('games')

client.connect()
console.log('Connected to Mongodb')
const PORT = process.env.PORT

const app = express()
app.use(cors())
app.use(express.json())
app.listen(PORT, () => console.log('API running on port', PORT))


// Get games from the 'shooters' 'genre' for testing
app.get('/get-genre', async (req, res) => {
    const allGames = await games.find({ 'genre': 'Shooters'}).toArray()
    res.send(allGames)
})


// Get all games
app.get('/', async (req, res) => {
    const allGames = await games.find().toArray()
    res.send(allGames)
})
