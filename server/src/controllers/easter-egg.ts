/* eslint-disable no-unused-vars */
import { EasterEggService as Service } from '@services'
import libUtc from '@libUtc'
import { Request, Response } from 'express'

const Teste = async (req: Request, res: Response) => {
  Service.Teste()
    .then(
      (suc) => { return res.json(suc) },
      (err) => { return res.json(err) }
    )
}

export default { Teste }
