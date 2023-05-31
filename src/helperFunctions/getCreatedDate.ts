function getDateOptions(): Intl.DateTimeFormatOptions {
  // функция для получения параметра options для метода toLocaleDateString
  return {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
}

export function getCreatedDate(seconds: number) {
  // функция для получения даты в формате May 1, 2012
  return `${new Date(seconds * 1000).toLocaleDateString('en-US', getDateOptions())} `;
}
