import { Component, forwardRef, Input, OnInit } from '@angular/core';
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

  currencies: ICurrency[] = [];
  selectedCurrency: ICurrency | null = null;
  isOpen: boolean = false;

  // ControlValueAccessor properties
  private onChange: (value: string) => void = () => { };
  private onTouched: () => void = () => { };

  constructor(private dataService: StaticDataService) { }

  ngOnInit(): void {
    this.currencies = this.dataService.Currencies;
  }

  // ControlValueAccessor methods
  writeValue(value: string): void {
    if (value) {
      this.selectedCurrency = this.currencies.find(c => c.code === value) || null;
    } else {
      this.selectedCurrency = null;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // Component methods
  toggleDropdown(): void {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.onTouched();
      }
    }
  }

  selectCurrency(currency: ICurrency): void {
    this.selectedCurrency = currency;
    this.onChange(currency.code);
    this.isOpen = false;
  }

  closeDropdown(): void {
    this.isOpen = false;
  }
}
