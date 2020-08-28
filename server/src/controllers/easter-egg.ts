/* eslint-disable no-unused-vars */
import { EasterEggService as Service } from '@services'
import libUtc from '@libUtc'
import { Request, Response } from 'express'

const Teste = async (req: Request, res: Response) => {
  try {
    const result = await Service.Teste()
    res.status(200)
    res.json(result)
  } catch (error) {
    res.status(500)
    res.json(error)
  }
}

export default { Teste }
