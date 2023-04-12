export default function getDateOptions(): Intl.DateTimeFormatOptions {
  // функция для получения параметра options для метода toLocaleDateString
  return {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
}
