const utcLib = {
  utcDate: (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const hour = date.getHours()
    const second = date.getSeconds()
    const millesecond = date.getMilliseconds()
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

    const year = dateNoUtc.getFullYear()
    const month = dateNoUtc.getMonth()
    const day = dateNoUtc.getDate()
    const hour = dateNoUtc.getHours()
    const second = dateNoUtc.getSeconds()
    const millesecond = dateNoUtc.getMilliseconds()

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
  }
}

export default utcLib
