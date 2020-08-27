import baseUrl from './api-baseUrl'

const projetosByIdColaboradorDia = async (idColaborador, diaReferencia) => {
  try {
    const result = await baseUrl
      .get("Projeto/ProjetosByIdColaboradorDia", {
        params: {
          idColaborador: idColaborador,
          diaReferencia: diaReferencia,
        },
      })
    return result
    
  } catch (error) {
    console.error(error)
  }
}

const projetosDefault = async (diaReferencia) => {
  try {
    const result = await baseUrl
      .get("Projeto/ProjetosDefault", {
        params: {
          diaReferencia: diaReferencia,
        },
      })
    return result
    
  } catch (error) {
   console.error(error) 
  }
}

export default {
  projetosByIdColaboradorDia,
  projetosDefault
}