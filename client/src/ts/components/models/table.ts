export default class Table {
  time: 'ASC' | 'DESC' = 'ASC';
  winValue: 'ASC' | 'DESC' = 'ASC';
  constructor() {}

  changeOrder(sortName: 'time' | 'winValue') { // смена порядка сортировки
    this[sortName] = this[sortName] === 'ASC' ? 'DESC' : 'ASC';
  }
}