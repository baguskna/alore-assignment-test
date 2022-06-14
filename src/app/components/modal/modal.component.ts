import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { colorPalette } from 'src/assets/color-palette';
import { SegmentSchema, TableSchema } from 'src/assets/interfaces';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() index: number;
  @Input() modalType: string;
  @Output() onCloseModal = new EventEmitter<void>();
  colorPalette = colorPalette;
  colorPaletteChosen = colorPalette[0];
  disabled = true;
  emoji = '😍';
  isColorPickerVisible = false;
  isEmojiPickerVisible = false;
  modalForm: FormGroup;

  get isSidebarModal(): boolean {
    return this.modalType === 'sidebar';
  }

  constructor(private formService: FormService) { }

  ngOnInit(): void {
    this.initForm();
    this.formStatusChanges();
  }

  initForm(): void {
    this.modalForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      icon: new FormControl(''),
    });

    if (this.isSidebarModal) {
      this.modalForm.addControl(
        'description', new FormControl(''),
      );
    } else {
      this.modalForm.addControl(
        'color', new FormControl(this.colorPaletteChosen),
      );
    }
  }

  formStatusChanges(): void {
    this.modalForm.statusChanges.subscribe((value) => {
      const isValid = (value === 'VALID');
      this.disabled = isValid === false;
    });
  }

  addEmoji(event): void {
    this.emoji = event.emoji.native;
    this.isEmojiPickerVisible = false;
  }

  onEmojiClick(): void {
    this.isEmojiPickerVisible = !this.isEmojiPickerVisible;
  }

  addColor(color: string): void {
    this.colorPaletteChosen = color;
    this.isColorPickerVisible = false;
  }

  onColorClick(): void {
    this.isColorPickerVisible = !this.isColorPickerVisible;
  }

  closeModal(): void {
    this.onCloseModal.emit();
  }

  onSubmit(): void {
    if (this.isSidebarModal) {
      const newSegment: SegmentSchema = {
        title: this.modalForm.get('name').value,
        titleIcon: this.emoji,
        segmentData: [],
      }
      this.formService.addData(newSegment);
    } else {
      const newTable: TableSchema = {
        icon: this.emoji,
        color: this.colorPaletteChosen,
        description: this.modalForm.get('name').value,
      }
      this.formService.addTable(newTable, this.index);
    }
    this.modalForm.reset();
    this.closeModal();
  }
}
