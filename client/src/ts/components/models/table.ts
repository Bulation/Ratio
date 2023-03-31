export default class Table {
  time: 'ASC' | 'DESC' = 'ASC';
  user: 'ASC' | 'DESC' = 'ASC';
  constructor() {}

  changeOrder(sortName: 'time' | 'user') { // смена порядка сортировки
    this[sortName] = this[sortName] === 'ASC' ? 'DESC' : 'ASC';
  }
}