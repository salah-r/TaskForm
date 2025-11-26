
import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICategory } from 'src/app/interfaces/ICategory';
import { ICurrency } from 'src/app/interfaces/ICurrency';
import { ICountryCode } from 'src/app/interfaces/ICountryCode';
import { StaticDataService } from 'src/app/services/static-data/static-data.service';
import { MessageService } from 'primeng/api';
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
  isMobile: boolean = false;
  // Date picker
  minDate: Date = new Date();
  // Screen size detection
  isTablet: boolean = false;
  isDesktop: boolean = true;
  forceCurrencyClose: boolean;




  constructor(
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private messageService: MessageService,
    private staticDataService: StaticDataService
  ) { }

  ngOnInit() {
    this.loadStaticData();
    this.setDefaultValues();
    this.checkScreenSize();

    this.staticDataService.selectedCategory$.subscribe(category => {
      if (category) {
        this.selectedCategory = category;
        this.categoryId.patchValue(category.id);
      } else {
        this.selectCategory(this.categories[0])
      }
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
    this.ref.detectChanges();
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
  loadStaticData() {
    this.categories = this.staticDataService.categories;
    this.currencies = this.staticDataService.Currencies;
    this.countryCodes = this.staticDataService.countryCodes;
  }

  // Set Default Values
  setDefaultValues() {
    // Select first category by default
    if (this.categories.length > 0) {
      this.selectCategory(this.categories[0]);
    }
    // Select first currency by default
    if (this.currencies.length > 0) {
      this.selectedCurrency = this.currencies[0];
      this.currency.patchValue(this.currencies[0].code);
    }
    // Select first country code by default
    if (this.countryCodes.length > 0) {
      this.selectedCountryCode = this.countryCodes[0];
      this.countryCode.patchValue(this.countryCodes[0].code);
    }
  }

  // Category Selection (Two-way sync)
  selectCategory(category: ICategory) {
    this.selectedCategory = category;
    this.categoryId.patchValue(category.id);
    this.staticDataService.setSelectedCategory(category);

  }

  isSelectedCategory(category: ICategory): boolean {
    return this.selectedCategory?.id === category.id;
  }

  // Currency Dropdown
  toggleCurrencyDropdown() {
    this.isCurrencyDropdownOpen = !this.isCurrencyDropdownOpen;
    this.isCountryCodeDropdownOpen = false; // Close other dropdown
  }

  selectCurrency(currency: ICurrency) {
    this.selectedCurrency = currency;
    this.currency.patchValue(currency.code);
    this.isCurrencyDropdownOpen = false;
  }

  // Country Code Dropdown
  toggleCountryCodeDropdown() {
    this.isCountryCodeDropdownOpen = !this.isCountryCodeDropdownOpen;
    this.isCurrencyDropdownOpen = false; // Close other dropdown
  }

  selectCountryCode(country: ICountryCode) {
    this.selectedCountryCode = country;
    this.countryCode.patchValue(country.code);
    this.isCountryCodeDropdownOpen = false;
  }


  // Save/Submit Function (Your Style - Button Click)
  saveAd() {

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
      const existing = localStorage.getItem('savedData');
      const parsedArray = existing ? JSON.parse(existing) : [];

      // 2️⃣ Push new ad object
      parsedArray.push(adData);

      // 3️⃣ Save again
      localStorage.setItem('savedData', JSON.stringify(parsedArray));

      // 4️⃣ Show confirmation message
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Data saved successfully to localStorage',
        life: 2500
      });

      // Optionally reset form
      this.adForm.reset();



    } else {
      // Mark all fields as touched to show errors
      Object.keys(this.adForm.controls).forEach(key => {
        this.adForm.get(key)?.markAsTouched();
      });
    }
  }

  checkScreenSize() {
    const width = window.innerWidth;

    this.isMobile = width < 768;
    this.isTablet = width >= 768 && width < 1025;
    this.isDesktop = width > 1024;

  }

  stopEvent(event: Event) {
    event.stopPropagation();
  }


}
