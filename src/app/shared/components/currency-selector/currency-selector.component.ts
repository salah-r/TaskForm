import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ICurrency } from 'src/app/interfaces/ICurrency';
import { StaticDataService } from 'src/app/services/static-data/static-data.service';

@Component({
  selector: 'app-currency-selector',
  templateUrl: './currency-selector.component.html',
  styleUrls: ['./currency-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencySelectorComponent),
      multi: true
    }
  ]
})
export class CurrencySelectorComponent implements OnInit, ControlValueAccessor {

  @Input() placeholder: string = 'Currency';
  @Input() disabled: boolean = false;
  @Input() forceClose: boolean = false; // Parent can force close dropdown
  @Output() onSelect = new EventEmitter<ICurrency>();

  currencies: ICurrency[] = [];
  selectedCurrency: ICurrency | null = null;
  isOpen: boolean = false;
  // ControlValueAccessor properties
  private onChange: (value: string) => void = () => { };
  private onTouched: () => void = () => { };

  constructor(private dataService: StaticDataService) { }

  ngOnInit() {
    this.currencies = this.dataService.Currencies;
  }



  // ControlValueAccessor methods
  writeValue(value: string) {
    if (value) {
      this.selectedCurrency = this.currencies.find(c => c.code === value) || null;
    } else {
      this.selectedCurrency = null;
    }
  }

  registerOnChange(fn: (value: string) => void) {
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
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.onTouched();
      }
    }
  }

  selectCurrency(currency: ICurrency) {
    this.selectedCurrency = currency;
    this.onChange(currency.code);
    this.isOpen = false;
  }

  closeDropdown() {
    this.isOpen = false;
  }
}
