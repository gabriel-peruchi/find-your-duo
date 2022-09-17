import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

import { convertHourToMinutes } from './utils/convertHourToMinutes'
import { convertMinutesToHour } from './utils/convertMinutesToHour'

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())

app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  })

  return response.json(games)
})

app.get('/games/:gameId/ads', async (request, response) => {
  const gameId = request.params.gameId
  const ads = await prisma.ad.findMany({
    where: {
      gameId,
    },
    select: {
      id: true,
      name: true,
      hourEnd: true,
      weekDays: true,
      hourStart: true,
      yearsPlaying: true,
      useVoiceChannel: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  const adsMapped = ads.map(ad => ({
    ...ad,
    weekDays: ad.weekDays.split(','),
    hourEnd: convertMinutesToHour(ad.hourEnd),
    hourStart: convertMinutesToHour(ad.hourStart),
  }))

  return response.json(adsMapped)
})

app.post('/games/:gameId/ads', async (request, response) => {
  const body = request.body
  const gameId = request.params.gameId

  // TODO: validation

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      discord: body.discord,
      yearsPlaying: body.yearsPlaying,
      weekDays: body.weekDays.join(','),
      useVoiceChannel: body.useVoiceChannel,
      hourEnd: convertHourToMinutes(body.hourEnd),
      hourStart: convertHourToMinutes(body.hourStart),
    }
  })

  return response.status(201).json(ad)
})

app.get('/ads/:adId/discord', async (request, response) => {
  const adId = request.params.adId
  const ad = await prisma.ad.findUniqueOrThrow({
    where: {
      id: adId
    },
    select: {
      discord: true
    }
  })

  return response.json(ad)
})

app.listen(3333, () => {
  console.log('Server is running on port 3333')
})
