import express from 'express'

const app = express()

app.get('/games', (request, response) => {
  return response.json([])
})

app.get('/games/:gameId/ads', (request, response) => {
  return response.json([])
})

app.post('/ads', (request, response) => {
  return response.status(201).json({})
})

app.get('/ads/:adId/discord', (request, response) => {
  return response.json({})
})

app.listen(3333, () => {
  console.log('Server is running on port 3333')
})
