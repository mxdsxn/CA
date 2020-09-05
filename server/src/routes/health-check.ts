import express from 'express'
import { HealthCheckController as Controller } from '@controllers'

const route = express.Router()

route.get('/', async (req, res) => {
  try {
    const result = await Controller.HealthCheck(req, res)
    res.status(200)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json({ error })
  }
})

const EasterEggRoute = route
export default EasterEggRoute
