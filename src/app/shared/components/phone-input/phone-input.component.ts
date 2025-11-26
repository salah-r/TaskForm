import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ICountryCode } from 'src/app/interfaces/ICountryCode';
import { StaticDataService } from 'src/app/services/static-data/static-data.service';

export interface PhoneValue {
  countryCode: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true
    }
  ]
})
export class PhoneInputComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder: string = 'Phone number';
  @Input() disabled: boolean = false;

  countryCodes: ICountryCode[] = [];
  selectedCountry: ICountryCode | null = null;
  phoneNumber: string = '';
  isDropdownOpen: boolean = false;

  private onChange: (value: PhoneValue) => void = () => { };
  private onTouched: () => void = () => { };

  constructor(private dataService: StaticDataService) { }

  ngOnInit() {
    this.countryCodes = this.dataService.countryCodes;
    if (this.countryCodes.length > 0) {
      this.selectedCountry = this.countryCodes[0];
    }
  }

  // ControlValueAccessor methods
  writeValue(value: PhoneValue) {
    if (value) {
      this.selectedCountry = this.countryCodes.find(c => c.code === value.countryCode) || this.countryCodes[0];
      this.phoneNumber = value.phoneNumber || '';
    }
  }

  registerOnChange(fn: (value: PhoneValue) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  // Component methods
  toggleDropdown() {
    if (!this.disabled) {
      this.isDropdownOpen = !this.isDropdownOpen;
    }
  }

  selectCountry(country: ICountryCode) {
    this.selectedCountry = country;
    this.isDropdownOpen = false;
    this.emitValue();
  }

  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    // Only allow numbers
    this.phoneNumber = input.value.replace(/[^0-9]/g, '');
    this.emitValue();
  }

  onBlur() {
    this.onTouched();
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  private emitValue() {
    this.onChange({
      countryCode: this.selectedCountry?.code || '',
      phoneNumber: this.phoneNumber
    });
  }
}
