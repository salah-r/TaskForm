import { ICurrency } from './../../interfaces/ICurrency';
import { ICategory } from './../../interfaces/ICategory';
import { Injectable, OnInit } from '@angular/core';
import { ICountryCode } from 'src/app/interfaces/ICountryCode';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class StaticDataService {

  private selectedCategorySubject = new BehaviorSubject<ICategory | null>(null);
  selectedCategory$ = this.selectedCategorySubject.asObservable();

  setSelectedCategory(category: ICategory) {
    this.selectedCategorySubject.next(category);
  }


  categories: ICategory[] = [
    { id: 'Cars', name: 'Cars', icon: 'pi pi-car' },
    { id: 'Properties', name: 'Properties', icon: 'pi pi-home' },
    { id: 'Electronics', name: 'Electronics', icon: 'pi pi-discord' },
    { id: 'computer', name: 'computer', icon: 'pi pi-box' },
    { id: 'Mobile', name: 'Mobile', icon: 'pi pi-mobile' },

  ]

  Currencies: ICurrency[] =
    [
      { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
      { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
      { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£', flag: '🇪🇬' },
      { code: 'SAR', name: 'Saudi Riyal', symbol: 'SR', flag: '🇸🇦' },
    ];



  locations: string[] = [
    'Cairo, Egypt',
    'Alexandria, Egypt',
    'Riyadh, Saudi Arabia',
    'Paris, France'
  ];

  countryCodes: ICountryCode[] = [
    { code: '+252', country: 'Somalia', },
    { code: '+20', country: 'Egypt', },
    { code: '+966', country: 'Saudi Arabia' },
    { code: '+971', country: 'UAE' },
  ];

}
