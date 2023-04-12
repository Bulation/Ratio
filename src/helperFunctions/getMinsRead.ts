export default function getMinsRead(seconds: number) {
  // получение количества минут из секунд
  return `(${Math.ceil(seconds / 60).toString()} mins read)`;
}
