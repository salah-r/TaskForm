import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent {
  @Output() menuBarToggle = new EventEmitter<void>(); // Event emitter for back button

  onBackBtn() {
    this.menuBarToggle.emit(); // Notify parent to toggle the menu bar
  }
  onLinkClick() {
    this.menuBarToggle.emit(); // Notify parent to toggle the menu bar
  }
}
