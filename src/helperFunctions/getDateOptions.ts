export default function getDateOptions(): Intl.DateTimeFormatOptions {
  return {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };
}
