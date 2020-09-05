/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */

import { EasterEggRepository as Repo } from '@repositories'

const easterEgg = async () => {
  return await Repo.easterEgg()
}

export default {
  easterEgg
}
