import getDateOptions from './getDateOptions';
import getMilliseconds from './getMilliseconds';

export default function getCreatedDate(seconds: number) {
  return `${new Date(getMilliseconds(seconds)).toLocaleDateString('en-US', getDateOptions())} `;
}
