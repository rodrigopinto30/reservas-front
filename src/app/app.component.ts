import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export default class AppComponent {
  title = 'angular-reservation';

  isSearchPanelOpen: boolean = false;

  // Aquí puedes añadir la lógica de openSearchPanel si es necesario
  openSearchPanel() {
    this.isSearchPanelOpen = true;
    // Lógica adicional que quieras implementar
  }
}
