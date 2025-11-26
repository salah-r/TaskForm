import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() isSidebarExpanded = false; // Receive sidebar state
  @Output() toggle = new EventEmitter<void>(); // Emit toggle event

  isMobileView = false;
  isDropdownOpen = false;

  toggleDropdown() {
    if (this.isMobileView) {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  }
  onLinkClick() {
    this.isDropdownOpen = false;
  }

  ngOnInit(): void {
    this.checkScreenWidth();
    window.addEventListener('resize', this.checkScreenWidth.bind(this));
  }

  checkScreenWidth() {
    this.isMobileView = window.innerWidth < 768;
  }

  toggleSidebar() {
    this.toggle.emit(); // Emit toggle event to parent
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.checkScreenWidth.bind(this));
  }
}
