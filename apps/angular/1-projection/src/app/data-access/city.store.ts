import { Injectable, signal } from '@angular/core';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  public cities = signal<City[]>([]);

  addAll(cities: City[]) {
    const existingIds = new Set(this.cities().map((c) => c.id));
    this.cities.set([
      ...this.cities(),
      ...cities.filter((c) => !existingIds.has(c.id)),
    ]);
  }

  addOne(city: City) {
    this.cities.set([...this.cities(), city]);
  }

  deleteOne(id: number) {
    this.cities.set(this.cities().filter((s) => s.id !== id));
  }
}
