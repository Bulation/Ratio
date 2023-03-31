import { COUNT_PER_PAGE } from "../../constants/constants";
import { IRecord } from "../../interfaces/IRecord";

export class RecordsModel {
  records: IRecord[] = []; // массив, в котором хранятся все рекорды
  pageNumber = 1; // номер текущей страницы таблицы рекордов
  constructor() {}
  
  loadRecords(records: IRecord[]) { // загрузка рекордов из локал стореджа
    this.records = records;
  }

  sortRecords(sortKey: keyof IRecord, order: string) { // сортировка рекордов по времени или значению
    if (order === 'ASC') {
      return this.records.sort((a, b) => a[sortKey] > b[sortKey] ? 1 : -1);
    }
    if (order === 'DESC') {
      return this.records.sort((a, b) => a[sortKey] > b[sortKey] ? -1 : 1);
    }
  }

  getSlicedData() { // получение данных постранично
    return this.records.slice((this.pageNumber - 1) * COUNT_PER_PAGE, this.pageNumber * COUNT_PER_PAGE);
  }
}