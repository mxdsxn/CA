const libUtc = {
  getDateByString: (dateString: string) => {
    const date = new Date(dateString)

    const year = date.getUTCFullYear()
    const month = date.getUTCMonth()
    const day = date.getUTCDate()
    const hour = date.getUTCHours()
    const minute = date.getUTCMinutes()
    const second = date.getUTCSeconds()
    const millesecond = date.getUTCMilliseconds()

    const result = new Date(
      Date.UTC(
        year, // year
        month, // month
        day, // day
        hour, // hour
        minute, // minute
        second, // second
        millesecond // millisecond
      )
    )
    return result
  },
  getDate: (dataReferencia?: Date) => {
    const data = dataReferencia || new Date()
    const year = data.getFullYear()
    const month = data.getUTCMonth()
    const day = data.getUTCDate()
    const hour = 0
    const minute = 0
    const second = 0
    const millesecond = 0

    const result = new Date(
      Date.UTC(
        year, // year
        month, // month
        day, // day
        hour, // hour
        minute, // minute
        second, // second
        millesecond // millisecond
      )
    )
    return result
  },
  getEndDate: (dataReferencia?: Date) => {
    const data = dataReferencia || new Date()
    const year = data.getUTCFullYear()
    const month = data.getUTCMonth()
    const day = data.getUTCDate()
    const hour = 23
    const minute = 59
    const second = 59
    const millesecond = 999

    const result = new Date(
      Date.UTC(
        year, // year
        month, // month
        day, // day
        hour, // hour
        minute, // minute
        second, // second
        millesecond // millisecond
      ))
    return result
  },
  getMonth: (dataReferencia?: Date) => {
    const data = dataReferencia || new Date()
    const year = data.getUTCFullYear()
    const month = data.getUTCMonth()
    const day = 1
    const hour = 0
    const minute = 0
    const second = 0
    const millesecond = 0

    const result = new Date(
      Date.UTC(
        year, // year
        month, // month
        day, // day
        hour, // hour
        minute, // minute
        second, // second
        millesecond // millisecond
      ))
    return result
  },
  getEndMonth: (dataReferencia?: Date) => {
    const data = dataReferencia || new Date()
    const year = data.getUTCFullYear()
    const month = data.getUTCMonth() + 1
    const day = 0
    const hour = 23
    const minute = 59
    const second = 59
    const millesecond = 999

    const result = new Date(
      Date.UTC(
        year, // year
        month, // month
        day, // day
        hour, // hour
        minute, // minute
        second, // second
        millesecond // millisecond
      ))
    return result
  },
  addDay: (dataReferencia: Date, dias?: number) => {
    const addNum = dias || 1
    const result = new Date(Date.UTC(dataReferencia.getUTCFullYear(), dataReferencia.getUTCMonth(), dataReferencia.getUTCDate() + addNum, 0, 0, 0, 0))
    return result
  }
}

export default libUtc
