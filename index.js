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

const app = express()
app.use(cors())
app.use(express.json())
app.listen(4040, () => console.log('API running on 4040'))


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
