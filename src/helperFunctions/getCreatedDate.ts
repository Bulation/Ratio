import getDateOptions from './getDateOptions'

export default function getCreatedDate(date: string) {
  // функция для получения даты в формате May 1, 2012
  return `${new Date(date).toLocaleDateString('en-US', getDateOptions())} `
}
