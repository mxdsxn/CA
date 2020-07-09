const libUtc = {
  getDateByString: (data: string) => {
    const dateNoUtc = new Date(data)

    const year = dateNoUtc.getUTCFullYear()
    const month = dateNoUtc.getUTCMonth()
    const day = dateNoUtc.getUTCDate()
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
  getDate: (data: Date) => {
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
  getEndDate: (data: Date) => {
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
  getMonth: (data: Date) => {
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
  getEndMonth: (data: Date) => {
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
  }
}

export default libUtc
