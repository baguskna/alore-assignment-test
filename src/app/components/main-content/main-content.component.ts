import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormService } from 'src/app/services/form.service';
import { SegmentSchema } from 'src/assets/interfaces';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
})
export class MainContentComponent implements OnInit, OnDestroy {
  data: SegmentSchema[];
  expand = true;
  index: number;
  isModalVisible = false;
  subscription: Subscription;

  constructor(private formService: FormService) { }

  ngOnInit(): void {
    this.subscription = this.formService.data$.subscribe((data) => {
      this.data = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openModal(index: number ): void {
    this.isModalVisible = true;
    this.index = index;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }
}
