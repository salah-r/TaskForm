import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ICategory } from 'src/app/interfaces/ICategory';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple'
import { StaticDataService } from 'src/app/services/static-data/static-data.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  @Input() selectedCategoryId: string | null = null;
  @Output() categorySelected = new EventEmitter<ICategory>();

  categories: ICategory[] = [];

  constructor(private dataService: StaticDataService) { }



  ngOnInit() {
    this.categories = this.dataService.categories;
    this.dataService.selectedCategory$.subscribe(category => {
      if (category) {
        this.selectedCategoryId = category.id;
      } else {

        this.selectCategory(this.categories[0])
      }
    });
    // this.selectedCategoryId = this.categories[0].id
  }

  selectCategory(category: ICategory) {
    this.selectedCategoryId = category.id;
    this.categorySelected.emit(category);
    this.dataService.setSelectedCategory(category);
  }


  isSelected(category: ICategory): boolean {
    return this.selectedCategoryId === category.id;
  }

  getCategoryClasses(category: ICategory): string {
    const baseClasses = 'tw-w-full tw-flex tw-items-center tw-gap-3 tw-px-4 tw-py-3 tw-rounded-lg tw-transition-all tw-duration-200 tw-text-left';

    if (this.isSelected(category)) {
      return `${baseClasses} tw-bg-blue-50 tw-border-2 tw-border-blue-200 hover:tw-bg-blue-100`;
    }
    return `${baseClasses} tw-bg-white hover:tw-bg-gray-50 tw-border-2 tw-border-transparent`;
  }

  getSelectedCategoryName(): string {
    const category = this.categories.find(c => c.id === this.selectedCategoryId);
    return category?.name || '';
  }
}









// import { Component, Input, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-sidebar',
//   templateUrl: './sidebar.component.html',
//   styleUrls: ['./sidebar.component.scss'],
// })
// export class SidebarComponent implements OnInit {
//   @Input() isSidebarExpanded = false; // Receive sidebar state from parent

//   ngOnInit(): void {
//     // Any other initialization logic can go here
//   }

//   toggleSidebar() {
//     // Emit an event to the parent to toggle the sidebar state
//     this.isSidebarExpanded = !this.isSidebarExpanded;
//   }
// }
