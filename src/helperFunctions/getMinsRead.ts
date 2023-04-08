export default function getMinsRead(seconds: number) {
  return `(${Math.ceil(seconds / 60).toString()} mins read)`;
}
