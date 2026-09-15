import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardItemDirective } from '../../directive/card-item.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      (add)="addCity()"
      [style.--bg]="'rgba(250, 150, 0, 0.1)'">
      <ng-template appCardItem let-item>
        <app-list-item
          [id]="item.id"
          [name]="item.name"
          (delete)="deleteCity($event)" />
      </ng-template>
      <ng-container card-image>
        <img ngSrc="assets/img/city.png" width="200" height="200" alt="" />
      </ng-container>
    </app-card>
  `,
  imports: [
    CardComponent,
    ListItemComponent,
    CardItemDirective,
    NgOptimizedImage,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  private http = inject(FakeHttpService);
  private store = inject(CityStore);

  cities = this.store.cities;

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }

  addCity(): void {
    this.store.addOne(randomCity());
  }

  deleteCity(id: number): void {
    this.store.deleteOne(id);
  }
}
