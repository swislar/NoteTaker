import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-sun-moon',
  standalone: true,
  imports: [],
  templateUrl: './sun-moon.component.html',
  styleUrl: './sun-moon.component.css',
})
export class SunMoonComponent {
  darkMode = signal<boolean>(false);

  constructor() {
    this.updateTheme();
  }

  private updateTheme() {
    if (this.darkMode()) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }

  setDarkMode() {
    this.darkMode.set(true);
    this.updateTheme();
  }

  setLightMode() {
    this.darkMode.set(false);
    this.updateTheme();
  }
}
