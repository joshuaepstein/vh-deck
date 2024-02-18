export function formatDate(date: Date, format: string): string {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const milliseconds = date.getMilliseconds()

    const dayString = day < 10 ? `0${day}` : `${day}`
    const monthString = month < 10 ? `0${month}` : `${month}`
    const yearString = year < 10 ? `0${year}` : `${year}`
    const hoursString = hours < 10 ? `0${hours}` : `${hours}`
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`
    const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`
    const millisecondsString =
        milliseconds < 10
            ? `00${milliseconds}`
            : milliseconds < 100
              ? `0${milliseconds}`
              : `${milliseconds}`
    const formattedDate = format
        .replace('DD', dayString)
        .replace('MM', monthString)
        .replace('YYYY', yearString)
        .replace('hh', hoursString)
        .replace('mm', minutesString)
        .replace('ss', secondsString)
        .replace('SSS', millisecondsString)
    return formattedDate
}
