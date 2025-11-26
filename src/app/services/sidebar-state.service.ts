import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarStateService {
  private isSidebarExpandedSubject = new BehaviorSubject<boolean>(false);
  isSidebarExpanded$ = this.isSidebarExpandedSubject.asObservable();

  private isMenubarVisibleSubject = new BehaviorSubject<boolean>(false);
  isMenubarVisible$ = this.isMenubarVisibleSubject.asObservable();

  constructor() { }

  toggleSidebar() {
    const currentState = this.isSidebarExpandedSubject.getValue();
    this.isSidebarExpandedSubject.next(!currentState);
  }
  toggleMenubar() {
    this.isMenubarVisibleSubject.next(!this.isMenubarVisibleSubject.value);
  }
  toggleMenuOff() {
    this.isMenubarVisibleSubject.next(false);
  }
}
