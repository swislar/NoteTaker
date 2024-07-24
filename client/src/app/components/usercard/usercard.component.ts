import { Component, Input, Output } from '@angular/core';
// import { EventEmitter } from 'node:stream';

@Component({
  selector: 'app-usercard',
  standalone: true,
  imports: [],
  templateUrl: './usercard.component.html',
  styleUrl: './usercard.component.css',
})
export class UsercardComponent {
  @Input({ required: true }) username!: string;
  // @Output() select = new EventEmitter();

  get cardUsername() {
    return this.username;
  }

  get cardIcon() {
    return;
  }

  // selectCard() {
  //   this.select.emit(this.username);
  // }

  // selectCardEvent() {
  //   this.select.emit(this.username); //use $event on the higher level component where the output is passed
  // }
}
