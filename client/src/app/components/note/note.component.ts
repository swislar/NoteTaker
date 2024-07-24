import { Component, inject, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',
})
export class NoteComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) text!: string;
  @Input({ required: true }) tags!: string[];

  get noteTags(): string[] {
    return this.tags;
  }

  get noteTitle(): string {
    return this.title;
  }

  get noteText(): string {
    return this.text;
  }
}
