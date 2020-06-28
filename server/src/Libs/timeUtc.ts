const timeUtc = {
  utcDate: (date: Date) => {
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
  utcString: (date: string) => {
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
  utcNextMonth: (data: Date) => {
    const result = data.getMonth() < 11
      ? new Date(data.getUTCFullYear(), data.getUTCMonth() + 1, 1, 0, 0, 0, 0)
      : data.getMonth() === 11
        ? new Date(data.getUTCFullYear() + 1, 1, 0, 0, 0, 0) : null
    return result
  }
}

export default timeUtc
