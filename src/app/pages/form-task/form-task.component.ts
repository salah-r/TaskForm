// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ICategory } from 'src/app/interfaces/ICategory';
// import { StaticDataService } from 'src/app/services/static-data/static-data.service';
// @Component({
//   selector: 'app-form-task',
//   templateUrl: './form-task.component.html',
//   styleUrls: ['./form-task.component.scss']
// })
// export class FormTaskComponent {
//   adForm!: FormGroup;
//   selectedCategory: ICategory | null = null;
//   locations: string[] = [];

//   // For date picker
//   minDate: Date = new Date();

//   constructor(
//     private fb: FormBuilder,
//     private dataService: StaticDataService
//   ) { }

//   ngOnInit(): void {
//     this.locations = this.dataService.locations;
//     this.initForm();
//   }

//   initForm(): void {
//     this.adForm = this.fb.group({
//       // Category
//       categoryId: ['', Validators.required],

//       // Row 1
//       adTitle: ['', [Validators.required, Validators.minLength(5)]],
//       startDate: [null, Validators.required],
//       endDate: [null, Validators.required],
//       cautionsUntilSold: [false],

//       // Row 2
//       description: ['', [Validators.required, Validators.minLength(20)]],
//       totalPrice: [null, [Validators.required, Validators.min(0)]],
//       currency: ['', Validators.required],
//       finalPrice: ['yes', Validators.required],

//       // Row 3
//       paymentType: ['cash', Validators.required],
//       paymentOption: ['full', Validators.required],

//       // Row 4
//       locationAddress: ['', Validators.required],
//       contactPhone: [{ countryCode: '+252', phoneNumber: '' }]
//     });
//   }

//   onCategorySelected(category: ICategory): void {
//     this.selectedCategory = category;
//     this.adForm.patchValue({ categoryId: category.id });
//   }

//   // Helper method to check if field is invalid
//   isFieldInvalid(fieldName: string): boolean {
//     const field = this.adForm.get(fieldName);
//     return field ? field.invalid && (field.dirty || field.touched) : false;
//   }

//   // Get error message for field
//   getErrorMessage(fieldName: string): string {
//     const field = this.adForm.get(fieldName);
//     if (!field) return '';

//     if (field.hasError('required')) {
//       return `${this.getFieldLabel(fieldName)} is required`;
//     }
//     if (field.hasError('minlength')) {
//       const minLength = field.errors?.['minlength']?.requiredLength;
//       return `Minimum ${minLength} characters required`;
//     }
//     if (field.hasError('min')) {
//       return `Value must be greater than 0`;
//     }
//     return '';
//   }

//   private getFieldLabel(fieldName: string): string {
//     const labels: { [key: string]: string } = {
//       adTitle: 'Ad Title',
//       startDate: 'Start Date',
//       endDate: 'End Date',
//       description: 'Description',
//       totalPrice: 'Total Price',
//       currency: 'Currency',
//       locationAddress: 'Location Address',
//       categoryId: 'Category'
//     };
//     return labels[fieldName] || fieldName;
//   }

//   onSubmit(): void {
//     if (this.adForm.valid) {
//       console.log('Form Data:', this.adForm.value);
//       // Handle form submission
//     } else {
//       // Mark all fields as touched to show validation errors
//       Object.keys(this.adForm.controls).forEach(key => {
//         this.adForm.get(key)?.markAsTouched();
//       });
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICategory } from 'src/app/interfaces/ICategory';
import { ICurrency } from 'src/app/interfaces/ICurrency';
import { ICountryCode } from 'src/app/interfaces/ICountryCode';
import { StaticDataService } from 'src/app/services/static-data/static-data.service';

@Component({
  selector: 'app-form-task',
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.scss']
})
export class FormTaskComponent implements OnInit {

  // Data
  categories: ICategory[] = [];
  currencies: ICurrency[] = [];
  countryCodes: ICountryCode[] = [];

  // Selected States
  selectedCategory: ICategory | null = null;
  selectedCurrency: ICurrency | null = null;
  selectedCountryCode: ICountryCode | null = null;

  // Dropdown States
  isCurrencyDropdownOpen: boolean = false;
  isCountryCodeDropdownOpen: boolean = false;

  // Date picker
  minDate: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private staticDataService: StaticDataService
  ) { }

  ngOnInit(): void {
    this.loadStaticData();
    this.setDefaultValues();
    this.staticDataService.selectedCategory$.subscribe(category => {
      if (category) {
        this.selectedCategory = category;
        this.adForm.patchValue({ categoryId: category.id });
      } else {
        this.selectCategory(this.categories[0])
      }
    });
  }

  // Form Definition (Your Style)
  adForm = this.fb.group({
    categoryId: ['', Validators.required],
    adTitle: ['', [Validators.required, Validators.minLength(5)]],
    startDate: [null as Date | null, Validators.required],
    endDate: [null as Date | null, Validators.required],
    cautionsUntilSold: [false],
    description: ['', [Validators.required, Validators.minLength(20)]],
    totalPrice: [null as number | null, [Validators.required, Validators.min(0)]],
    currency: ['', Validators.required],
    finalPrice: ['yes'],
    paymentType: ['cash'],
    paymentOption: ['full'],
    locationAddress: ['', Validators.required],
    countryCode: ['+252'],
    phoneNumber: ['']
  });

  // Getters (Your Style)
  get categoryId() {
    return this.adForm.get('categoryId');
  }
  get adTitle() {
    return this.adForm.get('adTitle');
  }
  get startDate() {
    return this.adForm.get('startDate');
  }
  get endDate() {
    return this.adForm.get('endDate');
  }
  get cautionsUntilSold() {
    return this.adForm.get('cautionsUntilSold');
  }
  get description() {
    return this.adForm.get('description');
  }
  get totalPrice() {
    return this.adForm.get('totalPrice');
  }
  get currency() {
    return this.adForm.get('currency');
  }
  get finalPrice() {
    return this.adForm.get('finalPrice');
  }
  get paymentType() {
    return this.adForm.get('paymentType');
  }
  get paymentOption() {
    return this.adForm.get('paymentOption');
  }
  get locationAddress() {
    return this.adForm.get('locationAddress');
  }
  get countryCode() {
    return this.adForm.get('countryCode');
  }
  get phoneNumber() {
    return this.adForm.get('phoneNumber');
  }

  // Load Data
  loadStaticData(): void {
    this.categories = this.staticDataService.categories;
    this.currencies = this.staticDataService.Currencies;
    this.countryCodes = this.staticDataService.countryCodes;
  }

  // Set Default Values
  setDefaultValues(): void {
    // Select first category by default
    if (this.categories.length > 0) {
      this.selectCategory(this.categories[0]);
    }
    // Select first currency by default
    if (this.currencies.length > 0) {
      this.selectedCurrency = this.currencies[0];
      this.adForm.patchValue({ currency: this.currencies[0].code });
    }
    // Select first country code by default
    if (this.countryCodes.length > 0) {
      this.selectedCountryCode = this.countryCodes[0];
      this.adForm.patchValue({ countryCode: this.countryCodes[0].code });
    }
  }

  // Category Selection (Two-way sync)
  selectCategory(category: ICategory): void {
    this.selectedCategory = category;
    this.adForm.patchValue({ categoryId: category.id });
    this.staticDataService.setSelectedCategory(category);

  }

  isSelectedCategory(category: ICategory): boolean {
    return this.selectedCategory?.id === category.id;
  }

  // Currency Dropdown
  toggleCurrencyDropdown(): void {
    this.isCurrencyDropdownOpen = !this.isCurrencyDropdownOpen;
    this.isCountryCodeDropdownOpen = false; // Close other dropdown
  }

  selectCurrency(currency: ICurrency): void {
    this.selectedCurrency = currency;
    this.adForm.patchValue({ currency: currency.code });
    this.isCurrencyDropdownOpen = false;
  }

  // Country Code Dropdown
  toggleCountryCodeDropdown(): void {
    this.isCountryCodeDropdownOpen = !this.isCountryCodeDropdownOpen;
    this.isCurrencyDropdownOpen = false; // Close other dropdown
  }

  selectCountryCode(country: ICountryCode): void {
    this.selectedCountryCode = country;
    this.adForm.patchValue({ countryCode: country.code });
    this.isCountryCodeDropdownOpen = false;
  }

  // Close dropdowns when clicking outside
  closeDropdowns(): void {
    this.isCurrencyDropdownOpen = false;
    this.isCountryCodeDropdownOpen = false;
  }

  // Save/Submit Function (Your Style - Button Click)
  saveAd(): void {
    console.log('Form Values:', this.adForm.value);

    if (this.adForm.valid) {
      const adData = {
        categoryId: this.categoryId?.value,
        adTitle: this.adTitle?.value,
        startDate: this.startDate?.value,
        endDate: this.endDate?.value,
        cautionsUntilSold: this.cautionsUntilSold?.value,
        description: this.description?.value,
        totalPrice: this.totalPrice?.value,
        currency: this.currency?.value,
        finalPrice: this.finalPrice?.value,
        paymentType: this.paymentType?.value,
        paymentOption: this.paymentOption?.value,
        locationAddress: this.locationAddress?.value,
        contactPhone: {
          countryCode: this.countryCode?.value,
          phoneNumber: this.phoneNumber?.value
        }
      };

      console.log('Submitting Ad:', adData);

      // TODO: Call your service here
      // this.adService.createAd(adData).subscribe({...});

    } else {
      // Mark all fields as touched to show errors
      Object.keys(this.adForm.controls).forEach(key => {
        this.adForm.get(key)?.markAsTouched();
      });
    }
  }
}
