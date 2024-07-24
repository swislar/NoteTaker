import { Component } from '@angular/core';

@Component({
  selector: 'app-header', // The HTML tag of this component
  standalone: true,
  imports: [],
  templateUrl: './header.component.html', // HTML for the component
  styleUrl: './header.component.css', // CSS for the component
})
export class HeaderComponent {
  // If you have a constructor in this class, add this class into the provider of the app config file
}
