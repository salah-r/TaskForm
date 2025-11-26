import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss'],
})
export class FullLayoutComponent implements OnInit, OnDestroy {
  private urlSubscription: any;

  isSidebarExpanded = true;
  isMobileView = false;
  isMenubarVisible = false;
  hideScrollbar: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.checkScreenWidth();

    this.urlSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.detectURL();
    });

    window.addEventListener('resize', this.checkScreenWidth.bind(this));
  }

  checkScreenWidth() {
    this.isMobileView = window.innerWidth <= 768;
    if (this.isMobileView) {
      this.isSidebarExpanded = false; // Hide sidebar by default on mobile view
    }
  }


  detectURL() {
    // Get current URL
    const currentURL = this.router.url;

    // Check if it contains '/signin'
    if (currentURL.includes('/signin') || currentURL.includes('/home') || currentURL.includes('/order-details')) {
      this.hideScrollbar = true
    } else {
      this.hideScrollbar = false

    };
  }

  toggleSidebar() {
    if (this.isMobileView) {
      this.isMenubarVisible = !this.isMenubarVisible;
    } else {
      this.isSidebarExpanded = !this.isSidebarExpanded;
    }
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.checkScreenWidth.bind(this));
  }
}
