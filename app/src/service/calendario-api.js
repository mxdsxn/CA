import baseUrl from './api-baseUrl'

const feriadosByMes = async (mesReferencia) => {
  try {
    const result = await baseUrl
      .get('/calendario/list/mes', {
        params: {
          mesReferencia: mesReferencia,
        },
      })
    return result.data

  } catch (error) {
    console.error(error)
  }
}

export default {
  feriadosByMes,
}
