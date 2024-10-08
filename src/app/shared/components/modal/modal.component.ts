import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SwitchService } from '../../../functions/switch/switch.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  constructor(private switchService: SwitchService) { }
  @Input() messageModal: string = '';  
  closeModal() {
    this.switchService.$modal.emit(false);
  }
}
