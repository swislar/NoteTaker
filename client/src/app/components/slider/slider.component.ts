import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [SliderModule, FormsModule, NgClass],
  templateUrl: './slider.component.html',
  styleUrls: [
    './slider.component.css',
    '../statify-menu/statify-menu.component.css',
  ],
})
export class SliderComponent {
  @Input() title!: string;
  @Input() valueArray!: number[];
  @Input() min!: number;
  @Input() max!: number;
  @Input() class: string = '';
  @Output() valueChange = new EventEmitter<number[]>();

  onSliderChange(newValue: number[]) {
    this.valueArray = newValue;
    this.valueChange.emit(this.valueArray);
  }
}
