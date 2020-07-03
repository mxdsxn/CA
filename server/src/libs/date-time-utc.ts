const libUtc = {
  getDate: (date: Date) => {
    const year = date.getFullYear()
    const month = date.getUTCMonth()
    const day = date.getUTCDate()
    const hour = 0
    const second = 0
    const millesecond = 0

    const result = new Date(
      Date.UTC(
        year,
        month,
        day,
        hour,
        second,
        millesecond
      )
    )
    return result
  },
  getDateByString: (date: string) => {
    const dateNoUtc = new Date(date)
    const year = dateNoUtc.getUTCFullYear()
    const month = dateNoUtc.getUTCMonth()
    const day = dateNoUtc.getUTCDate()
    const hour = 0
    const second = 0
    const millesecond = 0
    const result = new Date(
      Date.UTC(
        year,
        month,
        day,
        hour,
        second,
        millesecond
      )
    )
    return result
  },
  getEndMonth: (data: Date) => {
    const result = data.getUTCMonth() < 11
      ? new Date(Date.UTC(data.getUTCFullYear(), data.getUTCMonth() + 1, 0, 23, 59, 59, 999))
      : data.getUTCMonth() === 11
        ? new Date(Date.UTC(data.getUTCFullYear(), 12, 0, 23, 59, 59, 999)) : null
    return result
  },
  getEndDay: (data: Date) => {
    const result = new Date(Date.UTC(data.getUTCFullYear(), data.getUTCMonth(), data.getUTCDate(), 23, 59, 59, 999))
    console.log(result)
    return result
  }
}

export default libUtc
