import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SliderComponent } from '../';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-statify-menu',
  standalone: true,
  imports: [ButtonModule, SliderComponent, NgIf],
  templateUrl: './statify-menu.component.html',
  styleUrl: './statify-menu.component.css',
})
export class StatifyMenuComponent {
  @Input() musicAcousticness!: number[];
  @Input() musicEnergy!: number[];
  @Input() musicInstrumentals!: number[];
  @Input() musicPopularity!: number[];
  @Input() musicTempo!: number[];
  @Input() updateAcousticness!: (event: any) => void;
  @Input() updateEnergy!: (event: any) => void;
  @Input() updateInstrumentals!: (event: any) => void;
  @Input() updatePopularity!: (event: any) => void;
  @Input() updateTempo!: (event: any) => void;
  @Input() handleGetMusicRecommendation!: () => void;
  @Output() menuExpanded = new EventEmitter<boolean>();
  showSliders: boolean = true;

  updateShowSliders(): void {
    this.showSliders = !this.showSliders;
    this.menuExpanded.emit(this.showSliders);
  }

  handleSearchButton() {
    this.handleGetMusicRecommendation(); //Error on this function call => Probably to do with the input passed in
    this.updateShowSliders();
  }
}
