export default function convertArrayPriceToString(pricesArr: string[]) {
  const prices = pricesArr.slice();
  prices[0] = `$ ${prices[0].slice(1)}`;
  prices[1] = prices[1].slice(1);
  return `${prices.join(' - ')} USD`;
}