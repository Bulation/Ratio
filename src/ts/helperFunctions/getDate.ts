export function getDate(time: number) {
  const hour = Math.floor(time / 3600)
  const minute = Math.floor(time / 60);
  const second = time - 60 * minute;
  let stringHour = String(hour);
  let stringMinute = String(minute);
  let stringSecond = String(second);
  if (hour < 10) {
    stringHour = `0${hour}`;
  }
  if (minute < 10) {
    stringMinute = `0${minute}`;
  }
  if (second < 10) {
    stringSecond = `0${second}`;
  }
  return `${stringHour}:${stringMinute}:${stringSecond}`
}