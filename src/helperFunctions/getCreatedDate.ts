import getDateOptions from './getDateOptions';
import getMilliseconds from './getMilliseconds';

export default function getCreatedDate(seconds: number) {
  // функция для получения даты в формате May 1, 2012
  return `${new Date(getMilliseconds(seconds)).toLocaleDateString('en-US', getDateOptions())} `;
}
