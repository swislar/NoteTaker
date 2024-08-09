import { Component } from '@angular/core';
import { StatifyNavComponent } from '../../components/statify-nav/statify-nav.component';
import { HeaderComponent } from '../../components';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [StatifyNavComponent, HeaderComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent {}
