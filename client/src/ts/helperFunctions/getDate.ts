export function getDate(time: number) { // функция для перевода количество секунд во время формата HH:MM:SS
  const hour = Math.floor(time / 3600)
  const minute = Math.floor((time - 3600 * hour) / 60);
  const second = time - (60 * minute + hour * 3600);
  let stringHour = String(hour);
  let stringMinute = String(minute);
  let stringSecond = String(second);
  if (hour < 10) { // если значение меньше 10, то добавляем ведущий ноль
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