import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormService } from 'src/app/services/form.service';
import { SegmentSchema } from 'src/assets/interfaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  data: SegmentSchema[];
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

  onClose(): void {
    this.isModalVisible = false;
  }

  openModal(): void {
    this.isModalVisible = true;
  }
}
