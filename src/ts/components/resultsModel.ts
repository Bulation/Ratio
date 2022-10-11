import { IResult } from "../interfaces/IResult";

export class ResultsModel {
  results: IResult[] = [];
  records: IResult[] = [];
  constructor() {}

  saveResult(time: number, winValue: number) {
    this.results.push({
      'time': time,
      'winValue': winValue
    });
  }

  saveRecord(time: number, winValue: number) {
    if (!this.records.find((el) => el.winValue === winValue)) {
      this.records.push({
        'time': time,
        'winValue': winValue
      })
    } else if (this.records.find((el) => el.time > time && el.winValue === winValue)) {
      this.records = this.records.filter((el) => el.winValue !== winValue)
      this.records.push({
        'time': time,
        'winValue': winValue
      })
    }
  }
  
  loadRecords(records: IResult[]) {
    this.records = records;
  }

  loadResults(results: IResult[]) {
    this.results = results;
  }

  getResults() {
    return this.results;
  }

  getRecords() {
    return this.records;
  }

  getSortedResults(sortKey: keyof IResult, order: string) {
    const sortedArray = this.results.slice();
    if (order === 'ASC') {
      return sortedArray.sort((a, b) => a[sortKey] - b[sortKey]);
    } 
    if (order === 'DESC') {
      return sortedArray.sort((a, b) => b[sortKey] - a[sortKey]);
    }
  }

  getSortedRecords(sortKey: keyof IResult, order: string) {
    const sortedArray = this.records.slice();
    if (order === 'ASC') {
      return sortedArray.sort((a, b) => a[sortKey] - b[sortKey]);
    }
    if (order === 'DESC') {
      return sortedArray.sort((a, b) => b[sortKey] - a[sortKey]);
    }
  }
}