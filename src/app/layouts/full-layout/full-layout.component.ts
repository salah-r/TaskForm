import { Component, OnInit, OnDestroy, HostListener, ChangeDetectorRef } from '@angular/core';
import { Router, } from '@angular/router';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss'],
})
export class FullLayoutComponent implements OnInit, OnDestroy {

  isSidebarExpanded = true;
  isMobileView = false;      // < 768px
  isTabletView = false;      // 768px - 1024px
  isDesktopView = true;      // > 1024px
  isMenubarVisible = false;
  hideScrollbar: boolean = false;

  constructor(
    private router: Router,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.checkScreenWidth();


  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenWidth();
    this.ref.detectChanges();
  }

  checkScreenWidth() {
    const width = window.innerWidth;

    this.isMobileView = false;
    this.isTabletView = false;
    this.isDesktopView = false;

    if (width < 768) {
      this.isMobileView = true;
      this.isSidebarExpanded = false;
    } else if (width >= 768 && width < 1025) {
      this.isTabletView = true;
      this.isSidebarExpanded = false;
    } else {
      this.isDesktopView = true;
      this.isSidebarExpanded = true;
    }

    // console.log('Screen:', { width, mobile: this.isMobileView, tablet: this.isTabletView, desktop: this.isDesktopView });
  }



  toggleSidebar() {
    if (this.isMobileView) {
      this.isMenubarVisible = !this.isMenubarVisible;
    } else {
      this.isSidebarExpanded = !this.isSidebarExpanded;
    }
  }

  toggleMobileMenu() {
    this.isMenubarVisible = !this.isMenubarVisible;
  }

  ngOnDestroy() {

  }
}
