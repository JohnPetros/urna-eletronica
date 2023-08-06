export function getCurrentDate(daysToAdd = 0) {
  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() + daysToAdd)

  const year = currentDate.getFullYear()
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getDate()).padStart(2, '0')

  const formattedDate = `${year}-${month}-${day}`
  return formattedDate
}