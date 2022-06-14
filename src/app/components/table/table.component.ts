import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableSchema } from 'src/assets/interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('smoothCollapse', [
      state('initial', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0',
        visibility: 'hidden',
      })),
      state('final', style({
        overflow: 'visible',
      })),
      transition('initial<=>final', animate('250ms'))
    ])
  ],
})
export class TableComponent implements OnInit {
  @Input() dataTable: TableSchema[];
  @Input() index: number;
  @Input() title: string;
  @Input() titleIcon: string;
  @Output() onOpenModal = new EventEmitter<number>();
  expand = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggle(): void {
    this.expand = !this.expand;
  }

  openModal(): void {
    this.onOpenModal.emit(this.index);
  }
}
