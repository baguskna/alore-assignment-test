import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SegmentSchema, TableSchema } from 'src/assets/interfaces';
import { mockData } from 'src/assets/mock-data';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  data$: Observable<SegmentSchema[]>;
  /**
   * Defines a Subject which is a special type of Observable that allows values
   * to be multicasted to many Observers.
   */
  private dataChangeSource = new BehaviorSubject<SegmentSchema[]>(mockData);

  constructor() {
    // Turns the Subject to an Observable.
    this.data$ = this.dataChangeSource.asObservable();
  }

  addData(data: SegmentSchema): void {
    const newArray = [...this.dataChangeSource.getValue()];
    newArray.push(data);
    this.dataChangeSource.next(newArray);
  }

  addTable(table: TableSchema, index: number): void {
    const arr = this.dataChangeSource.getValue();
    arr[index].segmentData.push(table);
    this.dataChangeSource.next(arr);
  }
}
